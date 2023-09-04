import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
require('dotenv').config();
require('dotenv').config({
  path: `./environment/.env.${process.env.NODE_ENV}`,
});
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '..', '..', 'coverage'));

  const swaggerCconfig = new DocumentBuilder()
  .setTitle('BRI WM API')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();


  const document = SwaggerModule.createDocument(app, swaggerCconfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.GATEWAY_SERVICE_PORT);

  Logger.log(
    `Gateway service is running on ` +
    process.env.GATEWAY_SERVICE_PORT,
  );
}
bootstrap();
