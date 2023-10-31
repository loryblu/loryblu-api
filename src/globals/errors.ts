import { Prisma } from '@prisma/client';
import { isProductionEnv } from './constants';
import {
  UnknownErrorException,
  P2002Exception,
  P2025Exception,
} from './responses/exceptions';

export function prismaKnownRequestErrors(
  error: Prisma.PrismaClientKnownRequestError,
) {
  let target: string;

  switch (error.code) {
    case 'P2002':
      [target] = (error.meta?.target as Array<string>) || ['Unknow meta'];
      throw new P2002Exception(target);
    case 'P2025':
      target = (error.meta.cause as string).split("'")[1];
      throw new P2025Exception(target);
  }
}

export function unknownError(error: unknown) {
  // ! remover quando adicionar um logger
  if (!isProductionEnv) {
    console.info('unknownError', error);
  }

  throw new UnknownErrorException();
}

export function handleErrors(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    prismaKnownRequestErrors(error);
  }

  unknownError(error);
}
