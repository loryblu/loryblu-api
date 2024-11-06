import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  IsString,
  IsEnum,
  IsDateString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Genders } from '@prisma/client';
import {
  birthDateRegExp,
  fullnameRegExp,
  recoveryTokenRegExp,
} from 'src/globals/constants';
import { messages } from 'src/globals/responses/validation';
import { Transform } from 'class-transformer';
import { IsDateFormat, IsFullname } from 'src/decorators';

export class CreateAccountDto {
  @ApiProperty({ example: 'email@example.com' })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsEmail({}, { message: messages.email })
  readonly email: string;

  @ApiProperty({ example: 'stringW#3' })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsStrongPassword({}, { message: messages.strongPassword })
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty({ message: messages.notEmpty })
  @IsBoolean({ message: messages.boolean })
  readonly policiesAccepted: boolean;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsString({ message: messages.string })
  @MinLength(5, { message: messages.minLength })
  @Matches(fullnameRegExp, { message: messages.fullnamePattern })
  @IsFullname('parentName', { message: messages.multipleNameRequired })
  readonly parentName: string;

  @ApiProperty({ example: 'John Jr Doe' })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsString({ message: messages.string })
  @MinLength(5, { message: messages.minLength })
  @Matches(fullnameRegExp, { message: messages.fullnamePattern })
  @IsFullname('parentName', { message: messages.multipleNameRequired })
  readonly childrenName: string;

  @ApiProperty({ example: '2009-02-28' })
  @IsNotEmpty({ message: messages.notEmpty })
  @Matches(birthDateRegExp, { message: messages.birthDatePattern })
  @IsDateString({ strict: true }, { message: messages.birthDatePattern })
  @IsDateFormat('childrenBirthDate', { message: messages.birthDateRange })
  readonly childrenBirthDate: Date;

  @ApiProperty({ enum: Genders })
  @IsNotEmpty({ message: messages.notEmpty })
  @IsString({ message: messages.string })
  @Transform((params) => params.value.toLowerCase())
  @IsEnum(Genders, { message: messages.enum })
  readonly childrenGender: Genders;
}

export class ResetPasswordDto extends PickType(CreateAccountDto, ['email']) {}

export class AccessTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: messages.string })
  readonly accessToken: string;
}

export class SetPasswordDto extends PickType(CreateAccountDto, ['password']) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: messages.string })
  @Matches(recoveryTokenRegExp, { message: messages.recoveryTokenPattern })
  readonly recoveryToken: string;
}

export class LoginDto extends PickType(CreateAccountDto, [
  'email',
  'password',
]) {}
