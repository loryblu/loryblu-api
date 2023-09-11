import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ParentRepository } from './parent.repository';
import { CreateAccountDto } from './parent.dto';
import { encryptDataAsync, hashDataAsync } from 'src/globals/utils';

@Injectable()
export class ParentService {
  constructor(private parentRepository: ParentRepository) {}

  async newAccountPropsProcessing(input: CreateAccountDto): Promise<void> {
    if (input.policiesAccepted !== true) {
      throw new BadRequestException(
        'Por favor, para ter uma conta você deve aceitar nossos termos de uso e políticas de privacidade.',
      );
    }

    const hashedEmail = await hashDataAsync({
      unhashedData: input.email,
      salt: process.env.SALT_DATA_HASH,
    });

    if (!hashedEmail) {
      throw new InternalServerErrorException('Error when trying hash email');
    }

    const encryptedPassword = await encryptDataAsync({
      unencryptedPassword: input.password,
      salt: Number(process.env.SALT_DATA_PASS),
    });

    if (!encryptedPassword) {
      throw new InternalServerErrorException(
        'Error when trying encrypt some data.',
      );
    }

    const now = new Date();

    await this.parentRepository.saveCredentialParentAndChildrenProps({
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
}
