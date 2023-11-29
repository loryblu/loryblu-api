import { faker } from '@faker-js/faker';
import {
  CreateAccountDto,
  ResetPasswordDto,
} from 'src/modules/account/account.dto';
import { GetCredentialIdByEmailOutput } from 'src/modules/account/account.entity';
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
  password: faker.internet.password(),
  parentProfile: {
    id: faker.string.uuid(),
    fullname: faker.person.fullName(),
    childrens: [
      {
        id: faker.helpers.rangeToNumber({ min: 1, max: 1000 }),
        fullname: faker.person.fullName(),
        tasks: [],
      },
    ],
  },
};
