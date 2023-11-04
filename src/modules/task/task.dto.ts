import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { TaskFrequency, TaskShift } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { messages } from 'src/globals/responses/validation';

function transformFrequencyItems(param: TransformFnParams) {
  if (!Array.isArray(param.value)) {
    param.value = param.value.split(',');
  }

  const lowerCaseItems = param.value.map((item: string) => {
    return item.toLowerCase().trim();
  });

  return lowerCaseItems;
}

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

  @ApiProperty({ example: [TaskFrequency['mon']] })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsString({ each: true, message: messages.arrayOfString })
  @ArrayMinSize(1, { message: messages.minSize })
  @ArrayMaxSize(7, { message: messages.maxSize })
  @Transform(transformFrequencyItems)
  @IsEnum(TaskFrequency, { each: true, message: messages.enum })
  frequency: Array<TaskFrequency>;

  @ApiProperty()
  @IsNumber({}, { message: messages.number })
  @IsInt({ message: messages.integer })
  order: number = 0;
}

export class readTaskNewDto {
  @ApiProperty({ example: 1 })
  @Transform((param) => Number(param.value))
  @IsNumber({}, { message: messages.number })
  @IsInt({ message: messages.integer })
  @Min(1, { message: messages.minNumber })
  childrenId: number;

  @ApiProperty({ example: [TaskFrequency['mon']] })
  @IsString({ each: true, message: messages.arrayOfString })
  @Transform(transformFrequencyItems)
  @ArrayMinSize(1, { message: messages.minSize })
  @ArrayMaxSize(7, { message: messages.maxSize })
  @IsEnum(TaskFrequency, { each: true, message: messages.enum })
  frequency: Array<TaskFrequency>;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform((param) => Number(param.value))
  @IsNumber({}, { message: messages.number })
  @IsInt({ message: messages.integer })
  @Min(1, { message: messages.minNumber })
  page: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform((param) => Number(param.value))
  @IsNumber({}, { message: messages.number })
  @IsInt({ message: messages.integer })
  @Min(20, { message: messages.minNumber })
  @Max(70, { message: messages.minNumber })
  perPage: number = 20;
}
