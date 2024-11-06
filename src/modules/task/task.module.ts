import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import jwtModule from 'src/lib/jwt';
import { AccountRepository } from '../account/account.repository';

@Module({
  imports: [PrismaModule, jwtModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, AccountRepository],
})
export class TaskModule {}
