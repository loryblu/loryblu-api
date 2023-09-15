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
  fullnameRegExp,
  recoveryTokenRegExp,
  dataExampleISO8601,
} from 'src/globals/constants';
import { validationErrorMessages } from 'src/globals/errors';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty({ message: validationErrorMessages.emptyField })
  @IsEmail({}, { message: validationErrorMessages.emailPattern })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: validationErrorMessages.emptyField })
  @IsStrongPassword({}, { message: validationErrorMessages.passwordPattern })
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty({ message: validationErrorMessages.emptyField })
  @IsBoolean({ message: validationErrorMessages.booleanField })
  readonly policiesAccepted: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: validationErrorMessages.emptyField })
  @IsString({ message: validationErrorMessages.stringField })
  @MinLength(5, { message: validationErrorMessages.minLength })
  @Matches(fullnameRegExp, { message: validationErrorMessages.fullnameField })
  readonly parentName: string;

  @ApiProperty()
  @IsNotEmpty({ message: validationErrorMessages.emptyField })
  @IsString({ message: validationErrorMessages.stringField })
  @MinLength(5, { message: validationErrorMessages.minLength })
  @Matches(fullnameRegExp, { message: validationErrorMessages.fullnameField })
  readonly childrenName: string;

  @ApiProperty({ example: dataExampleISO8601 })
  @IsNotEmpty({ message: validationErrorMessages.emptyField })
  @IsDateString({}, { message: validationErrorMessages.birthDatePattern })
  readonly childrenBirthDate: Date;

  @ApiProperty({ enum: Genders })
  @IsNotEmpty({ message: validationErrorMessages.emptyField })
  @IsEnum(Genders, { message: validationErrorMessages.genderPattern })
  readonly childrenGender: Genders;
}

export class ResetPasswordDto extends PickType(CreateAccountDto, ['email']) {}

export class SetPasswordDto extends PickType(CreateAccountDto, ['password']) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: validationErrorMessages.stringField })
  @Matches(recoveryTokenRegExp, { message: validationErrorMessages.pattern })
  readonly recoveryToken: string;
}
