import { DocumentBuilder } from '@nestjs/swagger';
import { appDescription, appLicense, appName, appVersion } from './constants';
import { docSchemas } from './responses/docs';

export const swaggerDocumentConfig = new DocumentBuilder()
  .setVersion(appVersion)
  .setTitle(appName)
  .setDescription(appDescription)
  .setLicense(
    `${appLicense} License`,
    'https://github.com/loryblu/loryblu-api/blob/main/LICENSE',
  )
  .build();

swaggerDocumentConfig.components = {
  schemas: docSchemas,
};
