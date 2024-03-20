import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import {
  iTaskRepositoryInput,
  iTaskRepositoryReadManyInput,
  iTaskRepositoryReadManyOutput,
  iTaskRepositoryUpadateInput,
} from './task.entity';
import { CustomHttpError } from 'src/globals/responses/exceptions';

@Injectable()
export class TaskService {
  constructor(private repository: TaskRepository) {}

  async processNewTaskData(task: iTaskRepositoryInput) {
    await this.repository.saveTask(task);
    return;
  }

  async readAndProcessTasks(input: iTaskRepositoryReadManyInput) {
    const skipResults = --input.page * input.perPage;

    const tasks = await this.repository.readTasks({
      ...input,
      page: skipResults,
      perPage: input.perPage,
    });
    const count = tasks.length;
    const processTask = tasks.reduce(this.processTasks, {});

    return {
      processTask,
      count,
    };
  }

  async updateTask(input: iTaskRepositoryUpadateInput) {
    if (!input.categoryId && !input.frequency && !input.order && !input.shift) {
      throw new CustomHttpError('Ao menos um campo deve ser atualizado', 400);
    }

    await this.repository.updateTask(input);
  }

  async deleteTask({ id, parentId }: { id: string; parentId: string }) {
    const idNumber = parseInt(id);

    const existingTask = await this.repository.findTaskById(idNumber);
    const parent = await this.repository.validateParent(parentId);

    if (!existingTask) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }

    if (!parent) {
      throw new NotFoundException('Id do responsável inválida');
    }

    await this.repository.deleteTask(idNumber, parentId);
  }

  private processTasks(
    result: object,
    currentItem: iTaskRepositoryReadManyOutput,
  ) {
    const group = currentItem.category.group;

    if (!result[group]) {
      result[group] = [];
    }

    result[group].push({
      id: currentItem.id,
      shift: currentItem.shift,
      frequency: currentItem.frequency,
      order: currentItem.order,
      categoryId: currentItem.categoryId,
      categoryTitle: currentItem.category.category,
      updatedAt: currentItem.updatedAt,
    });

    return result;
  }
}
