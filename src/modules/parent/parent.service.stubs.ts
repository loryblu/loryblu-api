import { faker } from '@faker-js/faker';
import { CreateAccountDto } from './parent.dto';
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
