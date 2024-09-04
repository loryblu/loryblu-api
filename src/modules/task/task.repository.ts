import { Injectable } from '@nestjs/common';
import { handleErrors } from 'src/globals/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  iTaskRepositoryInput,
  iTaskRepositoryReadManyInput,
  iTaskRepositoryReadManyOutput,
  iTaskRepositoryUpadateInput,
} from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async readTasks(
    props: iTaskRepositoryReadManyInput,
  ): Promise<Array<iTaskRepositoryReadManyOutput>> {
    const { childrenId, parentId, frequency, page, perPage } = props;

    const tasks = await this.prisma.task
      .findMany({
        where: {
          childrenId: childrenId,
          children: {
            parentId: parentId,
          },
          frequency: {
            hasSome: frequency,
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
              category: true,
            },
          },
        },
        skip: page,
        take: perPage,
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
    const newTask = await this.prisma.task
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
    return newTask;
  }

  async updateTask(task: iTaskRepositoryUpadateInput) {
    try {
      await this.prisma.task.update({
        where: {
          id: task.id,
          children: {
            parentId: task.parentId,
            id: task.childrenId,
          },
        },
        data: {
          shift: task.shift,
          frequency: task.frequency,
          order: task.order,
          categoryId: task.categoryId,
        },
      });
    } catch (error) {
      handleErrors(error);
    }
  }

  async findTaskByIdAndChildren(
    id: number,
    childrenId: number,
    parentId: string,
  ) {
    return await this.prisma.task.findUnique({
      where: {
        id,
        childrenId,
        children: {
          parentId,
        },
      },
    });
  }

  async deleteTask(taskId: number) {
    await this.prisma.task
      .delete({
        where: { id: taskId },
      })
      .catch((error) => handleErrors(error));
  }
}
