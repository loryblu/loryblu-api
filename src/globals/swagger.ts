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
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
      bearerFormat: 'JWT',
      description: 'Use `accessToken`, ele é obtido no login.',
    },
    'Token de Acesso',
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
      bearerFormat: 'JWT',
      description: 'Use `refreshToken`, ele é obtido no login.',
    },
    'Token de atualização de sessão',
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
      bearerFormat: 'JWT',
      description:
        'Use `recoveryToken`, ele é obtido no e-mail enviado ao pedir a redefinição de senha.',
    },
    'Token de redefinição de senha',
  )
  .build();

swaggerDocumentConfig.components.schemas = docSchemas;
