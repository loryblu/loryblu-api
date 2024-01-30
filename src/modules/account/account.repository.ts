import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NewAccountRepositoryInput,
  GetCredentialIdByEmailOutput,
  PasswordResetInput,
  getCredentialIdByRecoveryTokenInput,
  getCredentialIdByRecoveryTokenOutout,
  SavePasswordInput,
} from './account.entity';
import { handleErrors } from 'src/globals/errors';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async saveCredentialParentAndChildrenProps(
    data: NewAccountRepositoryInput,
  ): Promise<void> {
    const { credential, parentProfile, childrenProfile } = data;

    await this.prisma.credential
      .create({
        data: {
          email: credential.email,
          password: credential.password,
          policiesAcceptedAt: credential.policiesAcceptedAt,
          role: credential.role,
          status: credential.status,
          parentProfile: {
            create: {
              fullname: parentProfile.fullname,
              childrens: {
                create: {
                  fullname: childrenProfile.fullname,
                  birthdate: childrenProfile.birthdate,
                  gender: childrenProfile.gender,
                },
              },
            },
          },
        },
      })
      .catch((error) => handleErrors(error));

    return;
  }

  async getCredentialIdByEmailOrId(idOrEmail: {
    id?: string;
    hashedEmail?: string;
  }): Promise<GetCredentialIdByEmailOutput | void> {
    let whereCondition = {};
    if (idOrEmail.hashedEmail) {
      whereCondition = { email: idOrEmail.hashedEmail };
    } else if (idOrEmail.id) {
      whereCondition = { id: idOrEmail.id[0] };
    } else {
      throw new Error('Invalid input');
    }

    const response = await this.prisma.credential
      .findFirst({
        where: whereCondition,
        select: {
          id: true,
          email: true,
          password: true,
          parentProfile: {
            select: {
              id: true,
              fullname: true,
              childrens: {
                select: {
                  id: true,
                  fullname: true,
                  gender: true,
                  birthdate: true,
                },
              },
            },
          },
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => handleErrors(error));

    return response;
  }

  async getCredentialIdByRecoveryToken(
    input: getCredentialIdByRecoveryTokenInput,
  ): Promise<getCredentialIdByRecoveryTokenOutout> {
    const { hashedToken, now } = input;

    const response = await this.prisma.resetPasswordInfo
      .findUnique({
        where: {
          recoveryToken: hashedToken,
          expiresIn: {
            gte: now,
          },
        },
        select: {
          credentialId: true,
        },
      })
      .then((response) => {
        if (response) {
          return { id: response.credentialId };
        }

        return;
      })
      .catch((error) => handleErrors(error));

    return response;
  }

  async savePassword(input: SavePasswordInput): Promise<void> {
    const { credentialId, encryptedPassword } = input;

    await this.prisma.credential
      .update({
        where: {
          id: credentialId,
        },
        data: {
          password: encryptedPassword,
          resetPasswordInfo: {
            delete: true,
          },
        },
      })
      .catch((error) => handleErrors(error));
  }

  async savePasswordResetInformation(input: PasswordResetInput): Promise<void> {
    const { recoveryToken, expiresIn, credentialId } = input;

    await this.prisma.resetPasswordInfo
      .upsert({
        where: {
          credentialId,
        },
        update: {
          recoveryToken,
          expiresIn,
        },
        create: {
          recoveryToken,
          expiresIn,
          credential: {
            connect: {
              id: credentialId,
            },
          },
        },
      })
      .catch((error) => handleErrors(error));
  }
}
