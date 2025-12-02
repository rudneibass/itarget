import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getSwaggerConfig, swaggerCustomOptions } from './config/swagger.config';
import { GlobalExceptionCatcher } from './global/global-exception-catcher';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  
  // Filters
  app.useGlobalFilters(new GlobalExceptionCatcher());
  
  // Pipes
  //app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Swagger - Configuração baseada no ambiente
  const environment = process.env.NODE_ENV || 'development';
  const swaggerConfig = getSwaggerConfig(environment);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger documentation is available at: http://localhost:${process.env.PORT ?? 3000}/docs`);
  console.log(`🌍 Environment: ${environment}`);
}
bootstrap();
