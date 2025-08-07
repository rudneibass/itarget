import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // Filters
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // Pipes
  //app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Swagger
  const config = new DocumentBuilder()
    .setTitle("Rudnei's API")
    .setDescription('Documentação da API NestJS com Swagger')
    .setVersion('1.0')
    .addTag('usuarios')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
