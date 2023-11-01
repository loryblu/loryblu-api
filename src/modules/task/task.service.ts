import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { iTaskRepositoryInput } from './task.entity';

@Injectable()
export class TaskService {
  constructor(private repository: TaskRepository) {}

  async processNewTaskData(task: iTaskRepositoryInput) {
    await this.repository.saveTask(task);

    return;
  }
}
