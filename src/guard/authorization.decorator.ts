import { SetMetadata } from '@nestjs/common';
import { Roles } from '@prisma/client';
import { iAuthTokenSubject } from 'src/modules/account/account.entity';

export type iAuthMetadata = {
  type: iAuthTokenSubject;
  role: Roles;
};

export const RequestToken = (authMetadata: iAuthMetadata) => {
  return SetMetadata('authMetadata', authMetadata);
};
