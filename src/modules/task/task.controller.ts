import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { responses } from 'src/globals/responses/docs';
import { TaskService } from './task.service';
import { TaskCreateDto } from './task.dto';
import { AuthorizationGuard, RequestToken } from 'src/guard';

@UseGuards(AuthorizationGuard)
@Controller('/task')
@ApiTags('Tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @RequestToken({ type: 'access', role: 'user' })
  @Post()
  @HttpCode(201)
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async create(@Body() input: TaskCreateDto, @Req() request: Request) {
    const sessionInfo = request['session.payload'];

    await this.service.processNewTaskData({
      parentId: sessionInfo.pid as string,
      ...input,
    });

    return {
      message: 'Nova tarefa criada com sucesso',
    };
  }
}
