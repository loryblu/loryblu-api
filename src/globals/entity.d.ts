import type { ApiResponseOptions } from '@nestjs/swagger';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { ValidationOptions } from 'class-validator';

export type HashDataAsyncProps = {
  unhashedData: string;
  salt: string;
};

export type EncryptDataAsyncProps = {
  unencryptedPassword: string;
  salt: number;
};

export type DocSchemas = {
  $200: SchemaObject;
  $201: SchemaObject;
  $202: SchemaObject;
  $400: SchemaObject;
  $401: SchemaObject;
  $403: SchemaObject;
  $422: SchemaObject;
  $500: SchemaObject;
};

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
