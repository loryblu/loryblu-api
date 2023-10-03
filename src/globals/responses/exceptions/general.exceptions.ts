import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
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
 * 401 - UnauthorizedException
 */
export class ExpiredRecoveryTokenException extends UnauthorizedException {
  constructor() {
    super('Token expirado, ou inválido.');
  }
}

/*
 * 422 - Unprocessable Entity
 */
export class EmailNotFoundException extends UnprocessableEntityException {
  constructor() {
    super('O e-mail informado não foi cadastrado.');
  }
}

/*
 * 500 - Internal Server Error
 */
export class UnknownErrorException extends InternalServerErrorException {
  constructor() {
    super('Erro não conhecido ao tentar executar ação.');
  }
}

export class EmailLoaderException extends InternalServerErrorException {
  constructor() {
    super('Erro durante a configuração do e-mail.');
  }
}

export class SendEmailException extends InternalServerErrorException {
  constructor() {
    super('Erro ao tentar enviar um e-mail.');
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
