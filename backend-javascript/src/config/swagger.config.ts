import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

// Configuração base do Swagger
export const swaggerConfig = new DocumentBuilder()
  .setTitle("Rudnei's API")
  .setDescription('Documentação da API NestJS com Swagger')
  .setVersion('1.0')
  .addTag('Usuários', 'Endpoints relacionados a usuários')
  .addTag('Organizações', 'Endpoints relacionados a organizações')
  .addTag('Notificações', 'Endpoints relacionados a notificações')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name here is important for references
  )
  .addServer('http://localhost:3000', 'Servidor Local')
  .addServer('https://api.exemplo.com', 'Servidor de Produção')
  .build();

// Opções customizadas do Swagger UI
export const swaggerCustomOptions: SwaggerCustomOptions = {
  customSiteTitle: 'API Documentation',
  /*customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #333; }
    .swagger-ui .scheme-container { background: #f8f9fa; }
  `,*/
  customCss: `
    .swagger-ui .info .title { color: #333; }
    .swagger-ui .scheme-container { background: #f8f9fa; }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
  },
  customJs: [
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-bundle.js',
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js'
  ],
  customCssUrl: [
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.9.0/swagger-ui.css'
  ],
};

// Configuração específica para desenvolvimento
export const swaggerDevConfig = new DocumentBuilder()
  .setTitle("Rudnei's API")
  .setDescription('Documentação da API NestJS com Swagger')
  .setVersion('1.0')
  .addTag('Usuários', 'Endpoints relacionados a usuários')
  .addTag('Organizações', 'Endpoints relacionados a organizações')
  .addTag('Notificações', 'Endpoints relacionados a notificações')
  .addBearerAuth()
  .addServer('http://localhost:3000', 'Servidor Local')
  .build();

// Configuração específica para produção
export const swaggerProdConfig = new DocumentBuilder()
  .setTitle("Rudnei's API")
  .setDescription('Documentação da API NestJS com Swagger')
  .setVersion('1.0')
  .addTag('Usuários', 'Endpoints relacionados a usuários')
  .addTag('Organizações', 'Endpoints relacionados a organizações')
  .addTag('Notificações', 'Endpoints relacionados a notificações')
  .addBearerAuth()
  .addServer('https://api.exemplo.com', 'Servidor de Produção')
  .build();

// Função para obter configuração baseada no ambiente
export function getSwaggerConfig(environment: string = 'development') {
  switch (environment) {
    case 'production':
      return swaggerProdConfig;
    case 'development':
    default:
      return swaggerDevConfig;
  }
} 