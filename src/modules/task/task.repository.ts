import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/globals/errors';
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
            hasSome: Array.isArray(frequency) ? frequency : [frequency],
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

  async updateTask(task: iTaskRepositoryUpadateInput) {
    await this.prisma.task
      .update({
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
      })
      .catch((error) => handleErrors(error));
  }

  async findTaskById(id: string, parentId: string) {
    // Adicione a lógica para encontrar a tarefa pelo ID e parentId
    return this.prisma.task.findFirst({
      where: {
        id: parseInt(id),
        children: {
          parentId: parentId,
        },
      },
    });
  }

  async deleteTask(id: string, parentId: string) {
    // Verifique se a tarefa existe antes de tentar excluí-la
    const existingTask = await this.prisma.task.findFirst({
      where: {
        id: parseInt(id),
        children: {
          parentId: parentId,
        },
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }

    // Exclua a tarefa
    await this.prisma.task
      .delete({
        where: {
          id: parseInt(id),
        },
      })
      .catch((error) => handleErrors(error));
  }
}
