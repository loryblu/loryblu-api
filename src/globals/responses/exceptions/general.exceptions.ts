import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { formatException } from 'src/globals/utils';

/*
 * 400 - BadRequestException
 */
export class PoliciesException extends BadRequestException {
  constructor() {
    super(
      formatException(
        'Por favor, para ter uma conta você deve aceitar nossos termos de uso e políticas de privacidade.',
      ),
    );
  }
}

/*
 * 401 - UnauthorizedException
 */
export class ExpiredRecoveryTokenException extends UnauthorizedException {
  constructor() {
    super(
      formatException('Token expirado, ou inválido.', 'Authorization token'),
    );
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(formatException('Credenciais inválidas.'));
  }
}

/*
 * 422 - Unprocessable Entity
 */
export class EmailNotFoundException extends UnprocessableEntityException {
  constructor() {
    super(formatException('O e-mail informado não foi cadastrado.', 'email'));
  }
}

/*
 * 500 - Internal Server Error
 */
export class UnknownErrorException extends InternalServerErrorException {
  constructor() {
    super(formatException('Erro não conhecido ao tentar executar ação.'));
  }
}

export class EmailLoaderException extends InternalServerErrorException {
  constructor() {
    super(formatException('Erro durante a configuração do e-mail.'));
  }
}

export class SendEmailException extends InternalServerErrorException {
  constructor() {
    super(formatException('Erro ao tentar enviar um e-mail.'));
  }
}

export class TryingHashException extends InternalServerErrorException {
  constructor() {
    super(formatException('Erro ao tentar criar o hash de uma informação.'));
  }
}

export class TryingEncryptException extends InternalServerErrorException {
  constructor() {
    super(formatException('Erro ao tentar criptografar uma informação.'));
  }
}
