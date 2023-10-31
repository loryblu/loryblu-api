import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/globals/errors';
import { iTaskRepositoryInput } from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async saveTask(task: iTaskRepositoryInput) {
    await this.prisma.task
      .create({
        data: {
          shift: task.shift,
          frequency: task.frequency,
          order: task.order,
          category: {
            connect: {
              id: task.categoryId,
            },
          },
          children: {
            connect: {
              id: task.childrenId,
              parentId: task.parentId,
            },
          },
        },
      })
      .catch((error) => handleErrors(error));
  }
}
