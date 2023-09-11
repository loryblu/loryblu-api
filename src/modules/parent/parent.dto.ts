import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  IsString,
  IsEnum,
  IsDateString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Genders } from '@prisma/client';
import { fullnameRegExp } from 'src/globals/constants';
import { errorMessages } from 'src/globals/errors';

export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty({ message: errorMessages.emptyField })
  @IsEmail({}, { message: errorMessages.emailPattern })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: errorMessages.emptyField })
  @IsStrongPassword({}, { message: errorMessages.passwordPattern })
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty({ message: errorMessages.emptyField })
  @IsBoolean({ message: errorMessages.booleanField })
  readonly policiesAccepted: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: errorMessages.emptyField })
  @IsString({ message: errorMessages.stringField })
  @Length(5, null, { message: errorMessages.minLength })
  @Matches(fullnameRegExp, { message: errorMessages.fullnameField })
  readonly parentName: string;

  @ApiProperty()
  @IsNotEmpty({ message: errorMessages.emptyField })
  @IsString({ message: errorMessages.stringField })
  @Length(5, null, { message: errorMessages.minLength })
  @Matches(fullnameRegExp, { message: errorMessages.fullnameField })
  readonly childrenName: string;

  @ApiProperty()
  @IsNotEmpty({ message: errorMessages.emptyField })
  @IsDateString({}, { message: errorMessages.birthDatePattern })
  readonly childrenBirthDate: Date;

  @ApiProperty({ enum: Genders })
  @IsNotEmpty({ message: errorMessages.emptyField })
  @IsEnum(Genders, { message: errorMessages.genderPattern })
  readonly childrenGender: Genders;
}
