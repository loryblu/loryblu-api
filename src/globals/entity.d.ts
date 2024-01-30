import type { ApiResponseOptions } from '@nestjs/swagger';
import type { ValidationOptions } from 'class-validator';

export type HashDataAsyncProps = {
  unhashedData: string;
  salt: string;
};

export type EncryptDataAsyncProps = {
  unencryptedPassword: string;
  salt: number;
};

type DeleteHandler = (id: string, request: Request) => Promise<void>;

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

type Validator = ValidationOptions['message'] | string;

export type Messages = {
  notEmpty: Validator;
  boolean: Validator;
  string: Validator;
  arrayOfString: Validator;
  number: Validator;
  integer: Validator;
  enum: Validator;
  minSize: Validator;
  maxSize: Validator;
  minNumber: Validator;
  maxNumber: Validator;
  minLength: Validator;
  email: Validator;
  strongPassword: Validator;
  fullnamePattern: Validator;
  multipleNameRequired: Validator;
  birthDatePattern: Validator;
  birthDateRange: Validator;
  recoveryTokenPattern: Validator;
  UUID: Validator;
};
