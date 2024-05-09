import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responses } from 'src/globals/responses/docs';
import { TaskService } from './task.service';
import {
  TaskCreateDto,
  readTaskNewDto,
  UpdateTaskDto,
  ValidateIdTask,
  DeleteTask,
} from './task.dto';
import { AuthorizationGuard, RequestToken } from 'src/guard';
import { iAuthTokenPayload } from '../account/account.entity';
import { sessionPayloadKey } from 'src/globals/constants';

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
    const childrenId = sessionInfo.cid;

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
    @Query() { id_task }: ValidateIdTask,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() request: Request,
  ) {
    const sessionInfo = request[sessionPayloadKey] as iAuthTokenPayload;

    await this.service.updateTask({
      childrenId: updateTaskDto.childrenId,
      parentId: sessionInfo.pid,
      id: id_task,
      categoryId: updateTaskDto.categoryId,
      frequency: updateTaskDto.frequency,
      order: updateTaskDto.order,
      shift: updateTaskDto.shift,
    });

    return {
      message: 'Tarefas atualizadas',
    };
  }

  @RequestToken({ type: 'access', role: 'user' })
  @Delete(':id')
  @HttpCode(200)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.forbidden)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async delete(@Param() { id }: DeleteTask, @Req() request: Request) {
    const sessionInfo = request[sessionPayloadKey] as iAuthTokenPayload;

    await this.service.deleteTask({
      id: id,
      parentId: sessionInfo.pid,
    });

    return {
      message: 'Tarefa excluída',
    };
  }
}
