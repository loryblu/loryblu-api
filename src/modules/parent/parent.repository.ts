import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewAccountRepositoryInput } from './parent.entity';
import { prismaKnownErrors } from 'src/globals/errors';

@Injectable()
export class ParentRepository {
  constructor(private prisma: PrismaService) {}

  async saveCredentialParentAndChildrenProps(
    data: NewAccountRepositoryInput,
  ): Promise<boolean> {
    const { credential, parentProfile, childrenProfile } = data;

    return await this.prisma.credential
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
        select: {},
      })
      .then(() => true)
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          prismaKnownErrors(error);
        }

        throw new InternalServerErrorException(
          'Error on trying saves new parents account',
        );
      });
  }
}
