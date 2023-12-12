import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import ValidationPipe from './globals/validation-pipe';
import { swaggerDocumentConfig } from './globals/swagger';
import { corsOptionsConfig } from './globals/cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string | number>('PORT');

  app.use(helmet());
  app.enableCors(corsOptionsConfig);
  app.useGlobalPipes(ValidationPipe);

  const document = SwaggerModule.createDocument(app, swaggerDocumentConfig);
  SwaggerModule.setup('', app, document);

  await app.listen(port, () => {
    console.info(`[ONN] Port: ${port}`);
  });
}

bootstrap();
