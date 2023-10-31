import { Prisma } from '@prisma/client';
import { constants } from './constants';
import { UnknownErrorException, P2002Exception } from './responses/exceptions';

import { UnauthorizedException } from '@nestjs/common';
import { formatException } from './utils';

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

export function handleJWTErrors(error: Error) {
  let message = 'Credenciais inválidas';

  if (error.message == 'jwt expired') {
    message = 'Sua chave de acesso expirou.';
  } else if (error.message == 'jwt must be provided') {
    message = 'Uma chave de acesso precisa ser informada.';
  } else if (error.message == 'jwt malformed') {
    message = 'Sua chave de acesso tem um formato errado.';
  } else if (error.message == 'jwt not active') {
    message = 'Sua chave de acesso ainda não está ativa.';
  } else if (error.message.includes('jwt subject invalid.')) {
    message = 'Sua chave de acesso não foi criada para este uso.';
  }

  throw new UnauthorizedException(formatException(message, 'authorization'));
}
