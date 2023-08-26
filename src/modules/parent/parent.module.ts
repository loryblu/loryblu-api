import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParentAccountController } from './parent.controller';
import { ParentAccountService } from './parent.service';
import { ParentAccountRepository } from './parent.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ParentAccountController],
  providers: [ParentAccountService, ParentAccountRepository],
})
export class ParentAccountModule {}
