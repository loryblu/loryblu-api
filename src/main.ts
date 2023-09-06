import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as constants from './globals/constants';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(constants.appName)
    .setVersion(constants.appVersion)
    .setLicense(
      constants.appLicense,
      'https://github.com/loryblu/loryblu-api/blob/main/LICENSE',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT, () => {
    console.log(`[ONN] Port: ${process.env.PORT}`);
  });
}

bootstrap();
