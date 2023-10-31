import { ConfigModule } from '@nestjs/config';

export const appName = 'LoryBlu';
export const appDescription = process.env.npm_package_description;
export const appVersion = process.env.npm_package_version;
export const appLicense = process.env.npm_package_license;

export const fullnameRegExp = /^[a-zÀ-ÿ ]+$/i;
export const recoveryTokenRegExp = /^[a-zA-Z0-9_-]+$/;

export const constants = () => ({
  NODE_ENV: process.env.NODE_ENV,
});

export default ConfigModule.forRoot({
  load: [() => constants],
  isGlobal: true,
});
