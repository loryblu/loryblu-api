import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { ValidationErrorMessagesProps } from './entity';
import { isDevelopmentEnv } from './constants';

export const validationErrorMessages: ValidationErrorMessagesProps = {
  emptyField: (args) => {
    return `O ${args.property} não pode estar vazio.`;
  },
  booleanField: (args) => {
    return `O ${args.property} deve ser booleano.`;
  },
  stringField: (args) => {
    return `O ${args.property} deve ser do tipo texto.`;
  },
  minLength: (args) => {
    return `O ${args.property} deve conter no mínimo ${args.constraints[0]} caracteres.`;
  },
  maxLength: (args) => {
    return `O ${args.property} deve conter no máximo ${args.constraints[1]} caracteres.`;
  },
  fullnameField: (args) => {
    return `O ${args.property} deve conter apenas letras e espaço em branco.`;
  },
  emailPattern: () => {
    return 'O e-mail informado deve ter um formato válido. ex: suenome@exemplo.com';
  },
  passwordPattern: () => {
    return 'A senha deve conter no mínimo uma letra maiúscula, uma letra minúscula, um número, um símbolo e no mínimo 8 caracteres.';
  },
  birthDatePattern: () => {
    return `A data de nascimento informada deve ser do tipo texto e ser neste formato: YYYY-MM-DD`;
  },
  genderPattern: (args) => {
    return `O sexo deve ser [${args.constraints[1]}].`;
  },
  pattern: (args) => {
    return `O ${args.property} está em um formato inválido.`;
  },
};

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
