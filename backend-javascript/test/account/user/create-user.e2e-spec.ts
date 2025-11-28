import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userId: string;

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

  it('/api/user/create (POST) - Should create a user successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({
        name: 'João da Silva',
        email: `jhon${Math.random()}@exemple.com`,
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id  
  });

  it('/api/user/:id (DELETE) - Should remove a user successfully', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .send();
    expect([200, 204]).toContain(response.status);
  });

});
