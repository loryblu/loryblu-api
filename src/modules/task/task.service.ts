import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import {
  iTaskRepositoryInput,
  iTaskRepositoryReadManyInput,
  iTaskRepositoryReadManyOutput,
} from './task.entity';

@Injectable()
export class TaskService {
  constructor(private repository: TaskRepository) {}

  async processNewTaskData(task: iTaskRepositoryInput) {
    await this.repository.saveTask(task);
    return;
  }

  async readAndProcessTasks(input: iTaskRepositoryReadManyInput) {
    const skipResults = input.page * input.perPage;

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
