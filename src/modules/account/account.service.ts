import { randomBytes } from 'node:crypto';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
} from './account.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  private async hashData(data: string): Promise<string> {
    const hashed = await hashDataAsync({
      unhashedData: data,
      salt: process.env.SALT_DATA_HASH,
    });

    if (!hashed) {
      throw new InternalServerErrorException('Error when trying hash data');
    }

    return hashed;
  }

  private async encryptPassword(password: string): Promise<string> {
    const encryptedPassword = await encryptDataAsync({
      unencryptedPassword: password,
      salt: Number(process.env.SALT_DATA_PASS),
    });

    if (!encryptedPassword) {
      throw new InternalServerErrorException(
        'Error when trying encrypt some data.',
      );
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
    const tokenExpiresIn = 6e4 * 1;
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

  async newAccountPropsProcessing(input: CreateAccountDto): Promise<void> {
    if (input.policiesAccepted !== true) {
      throw new BadRequestException(
        'Por favor, para ter uma conta você deve aceitar nossos termos de uso e políticas de privacidade.',
      );
    }

    const hashedEmail = await this.hashData(input.email);
    const encryptedPassword = await this.encryptPassword(input.password);
    const now = new Date();

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
        birthdate: input.childrenBirthDate,
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
      return;
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

    return {
      url,
      fullname: account.fullname,
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
      throw new BadRequestException(
        'Token expirado, ou inválido. Tente novamente.',
      );
    }

    const encryptedPassword = await this.encryptPassword(input.password);

    await this.accountRepository.savePassword({
      credentialId: credential.id,
      encryptedPassword,
    });

    return;
  }
}
