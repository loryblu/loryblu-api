import { Prisma } from '@prisma/client';
import { constants } from './constants';
import { UnknownErrorException, P2002Exception } from './responses/exceptions';

export function prismaKnownRequestErrors(
  error: Prisma.PrismaClientKnownRequestError,
) {
  const target = (error.meta?.target as Array<string>) || ['unknow_meta'];

  switch (error.code) {
    case 'P2002':
      throw new P2002Exception(target[0]);
  }
}

export function unknownError(error: unknown) {
  // ! remover quando adicionar um logger
  if (constants().NODE_ENV != 'production') {
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
