import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

/*
 * 400 - BadRequestException
 */
export class PoliciesException extends BadRequestException {
  constructor() {
    super(
      'Por favor, para ter uma conta você deve aceitar nossos termos de uso e políticas de privacidade.',
    );
  }
}

/*
 * 500 -
 */
export class UnknownErrorException extends InternalServerErrorException {
  constructor() {
    super('Erro não conhecido ao tentar executar ação.');
  }
}

export class TryingHashException extends InternalServerErrorException {
  constructor() {
    super('Erro ao tentar criar o hash de uma informação.');
  }
}

export class TryingEncryptException extends InternalServerErrorException {
  constructor() {
    super('Erro ao tentar criptografar uma informação.');
  }
}
