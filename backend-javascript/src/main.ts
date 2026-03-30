import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getSwaggerConfig, swaggerCustomOptions } from './config/swagger.config';
import { GlobalExceptionCatcher } from './global/global-exception-catcher';
import { join } from 'path';
import { readFileSync } from 'fs';
import hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.setGlobalPrefix('api');
  
  // Servir templates
  const adminTemplatesPath = join(process.cwd(), 'src', 'app', 'admin', 'templates');
  const landingTemplatesPath = join(process.cwd(), 'src', 'app', 'landing', 'templates');
  const socialTemplatesPath = join(process.cwd(), 'src', 'app', 'social', 'templates');
  app.setBaseViewsDir([adminTemplatesPath, landingTemplatesPath, socialTemplatesPath]);
  app.setViewEngine('hbs');
  app.useStaticAssets(join(process.cwd(), 'src', 'app', 'admin', 'static'), {
    prefix: '/admin/static/',
  });
  app.useStaticAssets(join(process.cwd(), 'src', 'app', 'social', 'static'), {
    prefix: '/social/static/',
  });
  app.useStaticAssets(join(process.cwd(), 'uploads', 'admin'), {
    prefix: '/admin/uploads/',
  });
  app.useStaticAssets(join(process.cwd(), 'uploads', 'social'), {
    prefix: '/social/uploads/',
  });
  hbs.registerPartial(
    'header',
    readFileSync(join(adminTemplatesPath, 'partials', 'header.hbs'), 'utf8'),
  );
  hbs.registerPartial(
    'aside',
    readFileSync(join(adminTemplatesPath, 'partials', 'aside.hbs'), 'utf8'),
  );
  hbs.registerPartial(
    'socialHeader',
    readFileSync(join(socialTemplatesPath, 'social', 'partials', 'header.hbs'), 'utf8'),
  );
  hbs.registerPartial(
    'socialNav',
    readFileSync(join(socialTemplatesPath, 'social', 'partials', 'nav.hbs'), 'utf8'),
  );

  // Filters
  // app.useGlobalFilters(new GlobalExceptionCatcher());
  
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

