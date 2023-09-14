import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule, MailModule } from './modules';

@Module({
  imports: [PrismaModule, MailModule, AccountModule],
})
export class AppModule {}
