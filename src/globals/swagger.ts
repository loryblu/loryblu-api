import { DocumentBuilder } from '@nestjs/swagger';
import { appLicense, appName, appVersion } from './constants';

export const swaggerDocumentConfig = new DocumentBuilder()
  .setTitle(appName)
  .setVersion(appVersion)
  .setLicense(
    `${appLicense} License`,
    'https://github.com/loryblu/loryblu-api/blob/main/LICENSE',
  )
  .build();
