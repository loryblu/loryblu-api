import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isDevelopmentEnv } from './constants';

export function prismaKnownRequestErrors(
  error: Prisma.PrismaClientKnownRequestError,
) {
  const target = (error.meta?.target as Array<string>) || ['unknow_meta'];

  switch (error.code) {
    case 'P2002':
      throw new BadRequestException(
        `O ${target} informado já está em uso, tente outro.`,
      );
  }
}

export function unknownError(error: unknown) {
  if (isDevelopmentEnv()) {
    console.info('unknownError', error);
  }

  throw new InternalServerErrorException('Erro ao tentar realizar a ação.');
}

export function hendleErrors(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    prismaKnownRequestErrors(error);
  }

  unknownError(error);
}
