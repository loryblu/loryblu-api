import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import ValidationPipe from './globals/validation-pipe';
import { swaggerDocumentConfig } from './globals/swagger';
import { corsOptionsConfig } from './globals/cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors(corsOptionsConfig);
  app.useGlobalPipes(ValidationPipe);

  const document = SwaggerModule.createDocument(app, swaggerDocumentConfig);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT, () => {
    console.info(`[ONN] Port: ${process.env.PORT}`);
  });
}

bootstrap();
