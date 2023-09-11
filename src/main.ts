import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { BaseExceptionFilter } from './shared/filters/base-exception.filter';
import { AppConfigService } from './shared/app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'fatal', 'verbose'],
  });
  const appConfig = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BaseExceptionFilter());
  await app.listen(appConfig.getAppPort());
}
bootstrap();
