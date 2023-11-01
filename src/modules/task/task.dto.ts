import { TaskFrequency, TaskShift } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { messages } from 'src/globals/responses/validation';

export class TaskCreateDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsNumber({}, { message: messages.number })
  @IsInt({ message: messages.integer })
  childrenId: number;

  @ApiProperty({ example: '44f29121-b7b1-4d1a-bbff-5f1cf2fc5497' })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsString({ message: messages.string })
  categoryId: string;

  @ApiProperty({ enum: TaskShift })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsString({ message: messages.string })
  @Transform((param) => param.value.toLowerCase())
  @IsEnum(TaskShift, { message: messages.enum })
  shift: TaskShift;

  @ApiProperty({ enum: TaskFrequency })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsString({ message: messages.string })
  @Transform((param) => param.value.toLowerCase())
  @IsEnum(TaskFrequency, { message: messages.enum })
  frequency: TaskFrequency;

  @ApiProperty()
  @IsNumber({}, { message: messages.number })
  @IsInt({ message: messages.integer })
  order: number = 0;
}
