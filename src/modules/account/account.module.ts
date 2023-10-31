import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import jwtModule from 'src/lib/jwt';

@Module({
  imports: [jwtModule, PrismaModule, MailModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
