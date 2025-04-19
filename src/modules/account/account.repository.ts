import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { handleErrors } from 'src/globals/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileDto } from './account.dto';
import {
  GetCredential,
  GetCredentialIdByEmailOutput,
  getCredentialIdByRecoveryTokenInput,
  getCredentialIdByRecoveryTokenOutout,
  NewAccountRepositoryInput,
  PasswordResetInput,
  SaveAccessTokenInput,
  SavePasswordInput,
  UpdateAccountRepositoryInput,
} from './account.entity';
import { error } from 'console';
@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) { }

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

  async existingParentProfileByEmail(email: string) {
    const existingParentProfile = await this.prisma.credential.findUnique({
      where: { email },
    });

    if (existingParentProfile) {
      return existingParentProfile;
    }

    return null;
  }

  async updateCredentialProps(input: UpdateAccountRepositoryInput, parentCredential: string) {
    const parentProfile = await this.prisma.credential.findUnique({
      where: { email: parentCredential },
    });
    if (!parentProfile) {
      throw new NotFoundException('Perfil do responsável não encontrado');
    }

    const existingParentProfile = await this.existingParentProfileByEmail(input.credential.email);
    if (existingParentProfile && existingParentProfile.email !== parentCredential) {
      throw new BadRequestException('E-mail inválido para atualização');
    }

    const childrenProfiles = await this.getChildrenId(parentCredential);
    const validChildrenIds = childrenProfiles.map((child) => child.id);

    for (const child of input.childrenProfile) {
      if (!validChildrenIds.includes(child.id)) {
        throw new NotFoundException(
          `Criança com Id ${child.id} não está associada ao responsável`,
        );
      }
    }

    const updateChildren = await Promise.all(
      input.childrenProfile.map(async (child) => {
        await this.prisma.childrenProfile.update({
          where: { id: child.id },
          data: {
            fullname: child.fullname,
            birthdate: child.birthdate,
            gender: child.gender,
          },

        });
      }),
    );

    if (!updateChildren) {
      throw new BadRequestException('Erro ao atualizar crianças');
    }

    const updatedAccount = await this.prisma.credential.update({
      where: {
        id: parentProfile.id,
      },
      data: {
        email: input.credential.email,
        password: input.credential.password,
        policiesAcceptedAt: input.credential.policiesAcceptedAt,
        role: 'user',
        status: 'active',
        parentProfile: {
          update: {
            fullname: input.parentProfile.fullname,
          },
        },
      },
    });

    return updatedAccount;
  }

  async getCredentialIdByEmail(
    email: string,
  ): Promise<GetCredentialIdByEmailOutput | void> {
    const response = await this.prisma.credential
      .findUnique({
        where: { email: email },
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
              profileImageUrl: true,
              childrens: {
                select: {
                  id: true,
                  fullname: true,
                  gender: true,
                  birthdate: true,
                  profileImageUrl: true,
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
    const expiresIn = new Date(Date.now() + 2 * 60 * 60 * 1000);

    await this.prisma.accessToken.upsert({
      where: {
        credentialId,
      },
      update: {
        accessToken,
        expiresIn,
      },
      create: {
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

  async getToken(accessToken: string) {
    const token = await this.prisma.accessToken.findUnique({
      where: { accessToken },
    });
    return token;
  }

  async invalidateToken(accessToken: string): Promise<void> {
    await this.prisma.accessToken
      .delete({
        where: { accessToken },
      })
      .catch((error) => handleErrors(error));
  }

  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  bucket = process.env.SUPABASE_BUCKET;

  async uploadFile(file: UploadFileDto, pathFile: string) {
    try {
      await this.supabase.storage
        .from(this.bucket)
        .upload(pathFile, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      const url = this.supabase.storage
        .from(this.bucket)
        .getPublicUrl(pathFile);

      return url.data;
    } catch (error) { }
  }

  async saveProfileImage(
    childrenId: number,
    parentCredential: string,
    path: string,
  ) {
    try {
      if (childrenId) {
        await this.prisma.childrenProfile.update({
          where: { id: childrenId },
          data: { profileImageUrl: path },
        });
      } else {
        const parentId = await this.getParentId(parentCredential);
        await this.prisma.parentProfile.update({
          where: {
            id: parentId,
          },
          data: {
            profileImageUrl: path,
          },
        });
      }
    } catch (error) {
      throw new Error('Erro ao salvar imagem ' + error);
    }
  }

  async getChildrenId(parentCredential: string) {
    const parentId = await this.getParentId(parentCredential);
    const childrenId = await this.prisma.childrenProfile.findMany({
      where: { parentId },
    });

    return childrenId;
  }

  async getParentId(email: string) {
    const parentId = await this.prisma.credential.findUnique({
      where: { email },
      select: {
        parentProfile: { select: { id: true } },
      },
    });

    return parentId.parentProfile.id;
  }
}
