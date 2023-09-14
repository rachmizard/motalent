import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './shared/app-config/app-config.service';
import { BaseExceptionFilter } from './shared/filters/base-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    maxAge: 3600,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: '*',
  });
  const appConfig = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new BaseExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Motalent')
    .setDescription('The motalent API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.getAppPort());
}
bootstrap();
