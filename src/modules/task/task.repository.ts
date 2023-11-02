import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/globals/errors';
import {
  iTaskRepositoryInput,
  iTaskRepositoryReadManyInput,
  iTaskRepositoryReadManyOutput,
} from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async readTasks(
    props: iTaskRepositoryReadManyInput,
  ): Promise<Array<iTaskRepositoryReadManyOutput>> {
    const { childrenId, parentId } = props;

    const tasks = await this.prisma.task
      .findMany({
        where: {
          childrenId: childrenId,
          children: {
            parentId: parentId,
          },
        },
        select: {
          id: true,
          categoryId: true,
          shift: true,
          frequency: true,
          order: true,
          updatedAt: true,
          category: {
            select: {
              group: true,
            },
          },
        },
        orderBy: [
          {
            order: 'asc',
          },
          {
            updatedAt: 'asc',
          },
        ],
      })
      .then((response) => response)
      .catch((error) => handleErrors(error));

    return tasks as [];
  }

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
