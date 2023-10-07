import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    MailModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
