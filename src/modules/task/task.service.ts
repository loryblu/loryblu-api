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
    const tasks = await this.repository.readTasks(input);
    const processTask = tasks.reduce(this.processTasks, {});

    return processTask;
  }

  private processTasks(
    result: object,
    currentItem: iTaskRepositoryReadManyOutput,
  ) {
    const group = currentItem.category.group as string;

    if (!result[group]) {
      result[group] = [];
    }

    delete currentItem.category;

    result[group].push(currentItem);

    return result;
  }
}
