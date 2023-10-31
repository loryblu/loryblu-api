import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { responses } from 'src/globals/responses/docs';
import { TaskCreateDto } from './task.dto';

@Controller('/task')
@ApiTags('Tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async create(@Body() input: TaskCreateDto) {
    await this.service.processNewTaskData({
      // ! Pegar o id da conta ativa
      parentId: 'd96fd284-3995-4a71-8f49-e8e99342b6d4',
      ...input,
    });

    return {
      message: 'Nova tarefa criada com sucesso',
    };
  }
}
