import { Injectable } from '@nestjs/common';
import { CustomHttpError } from 'src/globals/responses/exceptions';
import {
  iTaskRepositoryDeleteTaskInput,
  iTaskRepositoryInput,
  iTaskRepositoryReadManyInput,
  iTaskRepositoryReadManyOutput,
  iTaskRepositoryUpadateInput,
} from './task.entity';
import { TaskRepository } from './task.repository';

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

  async deleteTask(input: iTaskRepositoryDeleteTaskInput) {
    const taskId = parseInt(input.id);
    const childrenId = parseInt(input.childrenId);

    const existingTask = await this.repository.findTaskByIdAndChildren(
      taskId,
      childrenId,
    );
    const parent = await this.repository.validateParent(input.parentId);

    if (!existingTask) {
      throw new CustomHttpError('Tarefa não encontrada', 404);
    }

    if (!parent) {
      throw new CustomHttpError(
        'Id do responsável responsável não encontrado',
        404,
      );
    }

    await this.repository.deleteTask(taskId);
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
