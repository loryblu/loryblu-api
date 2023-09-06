import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  IsString,
  IsAlpha,
  Length,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Genders } from '@prisma/client';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly policiesAccepted: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5)
  @IsAlpha('pt-BR')
  readonly parentName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5)
  @IsAlpha('pt-BR')
  readonly childrenName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly childrenBirthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Genders)
  readonly childrenGender: Genders;
}
