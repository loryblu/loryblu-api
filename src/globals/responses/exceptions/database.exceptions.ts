import { UnprocessableEntityException } from '@nestjs/common';
import { formatException } from 'src/globals/utils';

export class P2002Exception extends UnprocessableEntityException {
  constructor(target: string) {
    super(formatException(`O ${target} informado já está em uso.`, target));
  }
}

export class P2025Exception extends UnprocessableEntityException {
  constructor(target: string) {
    super(
      formatException(`O campo ${target || ''} não pode ser acessado.`, target),
    );
  }
}
