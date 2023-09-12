import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NewAccountRepositoryInput,
  GetCredentialIdByEmailOutput,
  PasswordResetInput,
} from './parent.entity';
import { unknownError, prismaKnownRequestErrors } from 'src/globals/errors';

@Injectable()
export class ParentRepository {
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
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          prismaKnownRequestErrors(error);
        }

        unknownError(error);
      });

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
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          prismaKnownRequestErrors(error);
        }

        unknownError(error);
      });

    return response;
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
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          prismaKnownRequestErrors(error);
        }

        unknownError(error);
      });
  }
}
