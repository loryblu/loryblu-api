import type { ValidationOptions } from 'class-validator';

type Message = ValidationOptions['message'];

export type ErrorMessagesProps = {
  emptyField: Message;
  booleanField: Message;
  stringField: Message;
  minLength: Message;
  maxLength: Message;
  fullnameField: Message;
  emailPattern: Message;
  passwordPattern: Message;
  birthDatePattern: Message;
  genderPattern: Message;
};

export type HashDataAsyncProps = {
  unhashedData: string;
  salt: string;
};

export type EncryptDataAsyncProps = {
  unencryptedPassword: string;
  salt: number;
};
