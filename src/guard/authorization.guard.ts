import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { formatException } from 'src/globals/utils';
import { iAuthMetadata } from './authorization.decorator';
import { handleJWTErrors } from 'src/globals/errors';
import { sessionPayloadKey } from 'src/globals/constants';
import { AccountRepository } from '../modules/account/account.repository';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private secret: string;

  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly accountRepository: AccountRepository,
  ) {
    this.secret = this.configService.get<string>('SECRET_JWT');
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authMetadata = this.reflector.get<iAuthMetadata>(
      'authMetadata',
      context.getHandler(),
    );

    if (!authMetadata || !authMetadata.type || !authMetadata.role) {
      throw new InternalServerErrorException(
        formatException('O método CanActivate precisa ser configurado.'),
      );
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        formatException('Uma chave de acesso precisa ser informada.'),
      );
    }

    const tokenExists = await this.accountRepository.getToken(token);

    const validity = await this.jwtService
      .verifyAsync(token, {
        secret: this.secret,
        subject: authMetadata.type,
      })
      .then((response) => response)
      .catch((error) => handleJWTErrors(error));

    if (validity && tokenExists) {
      request[sessionPayloadKey] = validity;
      return true;
    }

    throw new InternalServerErrorException(
      formatException('O método CanActivate precisa ser verificado.'),
    );
  }
}
