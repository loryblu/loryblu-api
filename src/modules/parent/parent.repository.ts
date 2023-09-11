import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewAccountRepositoryInput } from './parent.entity';
import {
  unknownError,
  prismaKnownRequestErrors,
  prismaKnownValidationErrors,
} from 'src/globals/errors';

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

        if (error instanceof Prisma.PrismaClientValidationError) {
          prismaKnownValidationErrors(error);
        }

        unknownError(error);
      });

    return;
  }
}
