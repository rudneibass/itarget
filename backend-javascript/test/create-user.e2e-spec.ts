import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CreateUserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/user/create (POST) - deve criar um usuário com sucesso', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({
        name: 'João da Silva',
        email: `jhon${Math.random()}@exemple.com`,
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
