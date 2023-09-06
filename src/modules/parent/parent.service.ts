import { Injectable, BadRequestException } from '@nestjs/common';
import { ParentRepository } from './parent.repository';
import { CreateAccountDto } from './parent.dto';

@Injectable()
export class ParentService {
  constructor(private parentRepository: ParentRepository) {}

  async newAccountPropsProcessing(input: CreateAccountDto): Promise<boolean> {
    if (!input.policiesAccepted) {
      throw new BadRequestException(
        'Por favor, para ter uma conta você deve aceitar nossos termos de uso e políticas de privacidade.',
      );
    }

    const now = new Date();

    await this.parentRepository.saveCredentialParentAndChildrenProps({
      credential: {
        email: input.email,
        password: input.email,
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

    return true;
  }
}
