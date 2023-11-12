import { ConfigModule } from '@nestjs/config';

export const appName = 'LoryBlu';
export const appDescription = process.env.npm_package_description;
export const appVersion = process.env.npm_package_version;
export const appLicense = process.env.npm_package_license;

export const sessionPayloadKey = 'session.payload';

export const fullnameRegExp = /^[a-zÀ-ÿ ]+$/i;
export const recoveryTokenRegExp = /^[a-zA-Z0-9_-]+$/;
export const birthDateRegExp = /^[0-9]{4}(-[0-9]{1,2}){2}$/;

export const constants = () => ({
  PORT: process.env.PORT || 5500,
  NODE_ENV: process.env.NODE_ENV,

  SALT_DATA_HASH: process.env.SALT_DATA_HASH,
  SALT_DATA_PASS: process.env.SALT_DATA_PASS,

  SECRET_JWT: process.env.SECRET_JWT,

  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_NAME: process.env.MAIL_NAME,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
  WHITE_LIST: process.env.WHITE_LIST,

  MAIL_TEST_DELIVERED: process.env.MAIL_TEST_DELIVERED,
  MAIL_TEST_BOUNCED: process.env.MAIL_TEST_BOUNCED,
  MAIL_TEST_COMPLAINED: process.env.MAIL_TEST_COMPLAINED,
});

export default ConfigModule.forRoot({
  load: [() => constants],
  isGlobal: true,
});
