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
import { hendleErrors } from 'src/globals/errors';

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
      .catch((error) => hendleErrors(error));

    return;
  }

  async getCredentialIdByEmail(
    hashedEmail: string,
  ): Promise<GetCredentialIdByEmailOutput> {
    const response = await this.prisma.credential
      .findUnique({
        where: {
          email: hashedEmail,
        },
        select: {
          id: true,
          parentProfile: {
            select: {
              fullname: true,
            },
          },
        },
      })
      .then((response) => {
        if (response) {
          return {
            id: response.id,
            fullname: response.parentProfile.fullname,
          };
        }

        return null;
      })
      .catch((error) => hendleErrors(error));

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
      .catch((error) => hendleErrors(error));

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
      .catch((error) => hendleErrors(error));
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
      .catch((error) => hendleErrors(error));
  }
}
