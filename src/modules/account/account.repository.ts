import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NewAccountRepositoryInput,
  GetCredentialIdByEmailOutput,
  PasswordResetInput,
  getCredentialIdByRecoveryTokenInput,
  getCredentialIdByRecoveryTokenOutout,
  SavePasswordInput,
  GetCredential,
  SaveAccessTokenInput,
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

  async getCredentialIdByEmail(
    hashedemail: string,
  ): Promise<GetCredentialIdByEmailOutput | void> {
    const response = await this.prisma.credential
      .findUnique({
        where: { email: hashedemail },
        select: {
          id: true,
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

  async getCredentialId(id: string): Promise<GetCredential | void> {
    const response = await this.prisma.credential
      .findUnique({
        where: { id },
        select: {
          email: true,
          parentProfile: {
            select: {
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

  async saveToken(input: SaveAccessTokenInput) {
    const { credentialId, accessToken } = input;

    const existingToken = await this.prisma.accessToken.findUnique({
      where: { credentialId },
    });
    const expiresIn = new Date(Date.now() + 2 * 60 * 60 * 1000);

    if (existingToken) {
      await this.prisma.accessToken.update({
        where: {
          credentialId,
        },
        data: {
          accessToken,
          expiresIn,
        },
      });

      return true;
    } else {
      await this.prisma.accessToken.create({
        data: {
          accessToken,
          expiresIn,
          credential: {
            connect: {
              id: credentialId,
            },
          },
        },
      });

      return true;
    }
  }
}
