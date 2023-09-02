import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ParentModule, MailModule } from './modules';

@Module({
  imports: [PrismaModule, MailModule, ParentModule],
})
export class AppModule {}
