import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { ParentRepository } from './parent.repository';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [ParentController],
  providers: [ParentService, ParentRepository],
})
export class ParentModule {}
