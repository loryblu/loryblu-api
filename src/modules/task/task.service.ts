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
    return await this.repository.saveTask(task);
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

    return await this.repository.updateTask(input);
  }

  async deleteTask(input: iTaskRepositoryDeleteTaskInput) {
    const { taskId, childrenId, parentId } = input;

    const existingTask = await this.repository.findTaskByIdAndChildren(
      taskId,
      childrenId,
      parentId,
    );

    if (!existingTask) {
      throw new CustomHttpError('Tarefa não encontrada', 404);
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
