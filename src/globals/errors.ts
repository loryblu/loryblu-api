import { Prisma } from '@prisma/client';
import { constants } from './constants';
import {
  UnknownErrorException,
  P2002Exception,
  P2025Exception,
} from './responses/exceptions';

import { UnauthorizedException } from '@nestjs/common';
import { formatException } from './utils';

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
