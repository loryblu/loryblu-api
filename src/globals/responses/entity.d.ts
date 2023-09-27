import { ApiResponseOptions } from '@nestjs/swagger';
import { ValidationOptions } from 'class-validator';

export type ApiResponses = {
  ok: ApiResponseOptions;
  created: ApiResponseOptions;
  accepted: ApiResponseOptions;
  badRequest: ApiResponseOptions;
  unauthorized: ApiResponseOptions;
  forbidden: ApiResponseOptions;
  unprocessable: ApiResponseOptions;
  internalError: ApiResponseOptions;
};

type Validator = ValidationOptions['message'];

export type Messages = {
  notEmpty: Validator;
  boolean: Validator;
  string: Validator;
  minLength: Validator;
  email: Validator;
  strongPassword: Validator;
  fullnamePattern: Validator;
  birthDatePattern: Validator;
  genderPattern: Validator;
  recoveryTokenPattern: Validator;
};
