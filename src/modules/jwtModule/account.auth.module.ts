import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './account.auth.controller';

import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountModule } from '../account/account.module';
import { AuthService } from './account.auth.service';
import { AccountService } from '../account/account.service';
import { AccountRepository } from '../account/account.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    AccountModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccountService, AccountRepository],
})
export class AuthModule {}
