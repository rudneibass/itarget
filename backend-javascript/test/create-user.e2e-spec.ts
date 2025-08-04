import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CreateUserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], // deve importar o módulo principal que inclui o controller
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user/create (POST) - deve criar um usuário com sucesso', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({
        name: 'João da Silva',
        email: 'joao@example.com',
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // dependendo do que o serviço retorna
    expect(response.body.name).toBe('João da Silva');
  });

  it('/user/create (POST) - deve retornar erro se dados estiverem inválidos', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({
        email: 'sem_nome@example.com',
        // faltando `name` e `password`
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
