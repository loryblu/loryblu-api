import { faker } from '@faker-js/faker';
import { CreateAccountDto, ResetPasswordDto } from './parent.dto';
import { GetCredentialIdByEmailOutput } from './parent.entity';
import { Genders } from '@prisma/client';

export const createAccountInput: CreateAccountDto = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  policiesAccepted: faker.datatype.boolean(),
  parentName: faker.person.fullName(),
  childrenName: faker.person.fullName(),
  childrenBirthDate: faker.date.birthdate(),
  childrenGender: faker.person.sexType().toUpperCase() as Genders,
};

export const resetPasswordInput: ResetPasswordDto = {
  email: faker.internet.email(),
};

export const getCredentialOutput: GetCredentialIdByEmailOutput = {
  id: faker.helpers.rangeToNumber({ min: 1, max: 3000 }),
  fullname: faker.person.fullName(),
};
