import { randomBytes } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountRepository } from './account.repository';
import {
  CreateAccountDto,
  ResetPasswordDto,
  SetPasswordDto,
} from './account.dto';
import { encryptDataAsync, hashDataAsync } from 'src/globals/utils';
import {
  PasswordResetOutput,
  RandomTokenProps,
  RandomTokenOutput,
  FormatLinkProps,
  iAuthTokenSubject,
} from './account.entity';
import {
  EmailNotFoundException,
  ExpiredRecoveryTokenException,
  InvalidCredentialsException,
  PoliciesException,
  TryingEncryptException,
  TryingHashException,
} from 'src/globals/responses/exceptions';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  private hashSalt: string;
  private passSalt: number;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private accountRepository: AccountRepository,
  ) {
    this.hashSalt = this.configService.get<string>('SALT_DATA_HASH');
    this.passSalt = Number(this.configService.get<number>('SALT_DATA_PASS'));
  }

  private async hashData(data: string): Promise<string> {
    const hashed = await hashDataAsync({
      unhashedData: data,
      salt: this.hashSalt,
    });

    if (!hashed) {
      throw new TryingHashException();
    }

    return hashed;
  }

  private async encryptPassword(password: string): Promise<string> {
    const encryptedPassword = await encryptDataAsync({
      unencryptedPassword: password,
      salt: this.passSalt,
    });

    if (!encryptedPassword) {
      throw new TryingEncryptException();
    }

    return encryptedPassword;
  }

  private async randomToken(
    props: RandomTokenProps,
  ): Promise<RandomTokenOutput> {
    const { hashToken = false, bytes = 20, encoding = 'base64url' } = props;
    const token = randomBytes(bytes).toString(encoding);
    let hashedToken: string;

    if (hashToken) {
      hashedToken = await this.hashData(token);
    }

    return {
      original: token,
      hashed: hashedToken,
    };
  }

  private recoveryTokenExpirationDate(): Date {
    const tokenExpiresIn = 6e4 * 5;
    const now = new Date().getTime();
    const expiresIn = new Date(now + tokenExpiresIn);

    return expiresIn;
  }

  private formatDeepLink(props: FormatLinkProps): string {
    const { token, date } = props;
    const params = `r_token=${token}&expires_in=${date.toISOString()}`;
    const encodedParams = encodeURIComponent(params);

    return `loryblu://password_recovery/?${encodedParams}`;
  }

  // TODO: criar testes para login
  private async createAuthToken(payload: object, subject: iAuthTokenSubject) {
    const config: JwtSignOptions = {
      subject: subject,
    };

    if (subject === 'access') {
      config.expiresIn = '1h';
    }

    if (subject === 'refresh') {
      config.notBefore = '1h';
      config.expiresIn = '2h';
    }

    if (subject === 'recovery') {
      config.notBefore = '7s';
      config.expiresIn = '5m';
    }

    const token = this.jwtService.sign(payload, config);

    return token;
  }

  async newAccountPropsProcessing(input: CreateAccountDto): Promise<void> {
    if (input.policiesAccepted !== true) {
      throw new PoliciesException();
    }

    const hashedEmail = await this.hashData(input.email);
    const encryptedPassword = await this.encryptPassword(input.password);
    const now = new Date();
    const childrenBirthDate = new Date(input.childrenBirthDate);

    await this.accountRepository.saveCredentialParentAndChildrenProps({
      credential: {
        email: hashedEmail,
        password: encryptedPassword,
        policiesAcceptedAt: now,
        role: 'USER',
        status: 'ACTIVE',
      },
      parentProfile: {
        fullname: input.parentName,
      },
      childrenProfile: {
        fullname: input.childrenName,
        gender: input.childrenGender,
        birthdate: childrenBirthDate,
      },
    });

    return;
  }

  async createTokenToResetPassword(
    input: ResetPasswordDto,
  ): Promise<PasswordResetOutput> {
    const { email } = input;

    // ! verificar responsabilidade única
    const hashedEmail = await this.hashData(email);
    const account = await this.accountRepository.getCredentialIdByEmail(
      hashedEmail,
    );

    if (!account) {
      throw new EmailNotFoundException();
    }

    const generatedToken = await this.randomToken({
      bytes: 40,
      hashToken: true,
    });

    const expiresIn = this.recoveryTokenExpirationDate();

    await this.accountRepository.savePasswordResetInformation({
      credentialId: account.id,
      expiresIn: expiresIn,
      recoveryToken: generatedToken.hashed,
    });

    const url = this.formatDeepLink({
      token: generatedToken.original,
      date: expiresIn,
    });

    delete account.password;

    return {
      url,
      fullname: account.parentProfile.fullname,
    };
  }

  async saveNewPassword(input: SetPasswordDto): Promise<void> {
    const { recoveryToken } = input;

    const hashedToken = await this.hashData(recoveryToken);
    const credential =
      await this.accountRepository.getCredentialIdByRecoveryToken({
        hashedToken,
        now: new Date(),
      });

    if (!credential) {
      throw new ExpiredRecoveryTokenException();
    }

    const encryptedPassword = await this.encryptPassword(input.password);

    await this.accountRepository.savePassword({
      credentialId: credential.id,
      encryptedPassword,
    });

    return;
  }

  async login(email: string, password: string) {
    const hashedEmail = await this.hashData(email);

    const credential = await this.accountRepository.getCredentialIdByEmail(
      hashedEmail,
    );

    if (!credential) {
      throw new EmailNotFoundException();
    }

    const comparePassword = await bcrypt.compare(password, credential.password);

    if (!comparePassword) {
      throw new InvalidCredentialsException();
    }

    delete credential.password;

    const tokenPayload = {
      cid: credential.id,
      pid: credential.parentProfile.id,
    };

    const token = this.createAuthToken(tokenPayload, 'access');
    const refresh = this.createAuthToken(tokenPayload, 'refresh');

    return {
      token,
      refresh,
    };
  }
}
