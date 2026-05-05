import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { App } from 'supertest/types';
import { UserInterface } from '../src/common/interface/user.interface';

describe('Users Page', () => {
  let app: INestApplication<App>;
  let userId: string;
  const phoneNumber = '09144676519';

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer()).get(
      `/core/users/by/phone/${phoneNumber}`,
    );

    if (response.ok) {
      const user: UserInterface = response.body as UserInterface;

      userId = user.body.id;
    } else {
      const response = await request(app.getHttpServer())
        .post('/core/users')
        .send({
          phone: phoneNumber,
          password: '123456789',
          fullName: 'Amin Ahmadi',
        });

      const user: UserInterface = response.body as UserInterface;

      userId = user.body.id;
    }
  });

  afterAll(async (): Promise<void> => await app.close());

  describe('Users Routes', () => {
    it('FindAll users', async () => {
      return request(app.getHttpServer()).get('/core/users').expect(200);
    });
    it('FindOne user by id', async () => {
      return request(app.getHttpServer())
        .get(`/core/users/${userId}`)
        .expect(200);
    });
    it('FindOne user by phone', async () => {
      return request(app.getHttpServer())
        .get(`/core/users/by/phone/${phoneNumber}`)
        .expect(200);
    });
    it('Create user', async () => {
      return request(app.getHttpServer())
        .post('/core/users')
        .send({
          phone: phoneNumber,
          password: '123456789',
          fullName: 'Amin Ahmadi',
        })
        .expect(409);
    });
    it('Update user by id', async () => {
      return request(app.getHttpServer())
        .patch(`core/users/${userId}`)
        .send({
          fullName: 'Amir Ahmadi',
        })
        .expect(200);
    });
  });
});
