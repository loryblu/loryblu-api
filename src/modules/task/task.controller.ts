import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { sessionPayloadKey } from 'src/globals/constants';
import { responses } from 'src/globals/responses/docs';
import { AuthorizationGuard, RequestToken } from 'src/guard';
import { iAuthTokenPayload } from '../account/account.entity';
import {
  DeleteTask,
  readTaskNewDto,
  TaskCreateDto,
  UpdateTaskDto,
  ValidateIdTask,
} from './task.dto';
import { TaskService } from './task.service';

@UseGuards(AuthorizationGuard)
@Controller('/task')
@ApiTags('Tasks')
@ApiBearerAuth('access')
export class TaskController {
  constructor(private service: TaskService) {}

  @RequestToken({ type: 'access', role: 'user' })
  @Post()
  @HttpCode(201)
  @ApiResponse(responses.created)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async create(@Body() input: TaskCreateDto, @Req() request: Request) {
    const sessionInfo = request[sessionPayloadKey] as iAuthTokenPayload;

    await this.service.processNewTaskData({
      parentId: sessionInfo.pid,
      ...input,
    });

    return {
      message: 'Nova tarefa criada com sucesso',
    };
  }

  @RequestToken({ type: 'access', role: 'user' })
  @Get()
  @HttpCode(200)
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async read(@Query() queryParams: readTaskNewDto, @Req() request: Request) {
    const sessionInfo = request[sessionPayloadKey] as iAuthTokenPayload;

    const { processTask, count } = await this.service.readAndProcessTasks({
      ...queryParams,
      parentId: sessionInfo.pid,
    });
    const childrenId = queryParams.childrenId;

    return {
      message: 'Tarefas encontradas',
      data: {
        childrenId,
        count,
        ...processTask,
      },
    };
  }

  @RequestToken({ type: 'access', role: 'user' })
  @Patch()
  @HttpCode(200)
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async update(
    @Query() { taskId }: ValidateIdTask,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() request: Request,
  ) {
    const sessionInfo = request[sessionPayloadKey] as iAuthTokenPayload;

    const updateResult = await this.service.updateTask({
      childrenId: updateTaskDto.childrenId,
      parentId: sessionInfo.pid,
      id: taskId,
      categoryId: updateTaskDto.categoryId,
      frequency: updateTaskDto.frequency,
      order: updateTaskDto.order,
      shift: updateTaskDto.shift,
    });

    return {
      message: 'Tarefas atualizadas',
      data: {
        childrenId: updateResult.childrenId,
        id: taskId,
        categoryId: updateResult.categoryId,
        frequency: updateResult.frequency,
        order: updateResult.order,
        shift: updateResult.shift,
      },
    };
  }

  @RequestToken({ type: 'access', role: 'user' })
  @Delete()
  @HttpCode(200)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async delete(
    @Query() { childrenId, taskId }: DeleteTask,
    @Req() request: Request,
  ) {
    const sessionInfo = request[sessionPayloadKey] as iAuthTokenPayload;

    await this.service.deleteTask({
      taskId,
      parentId: sessionInfo.pid,
      childrenId: childrenId,
    });

    return {
      message: 'Atividade excluída com sucesso',
    };
  }
}
