import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { App } from 'supertest/types';
import { UserInterface } from '../src/common/interface/user.interface';

describe('Users Page', () => {
  let app: INestApplication<App>;
  let userId: string;
  const phoneNumber = '09990000000';
  const userPassword = '000000000';

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const result = await request(app.getHttpServer()).get(
      `/core/users/by/phone/${phoneNumber}`,
    );

    if (result.ok) {
      const user: UserInterface = result.body as UserInterface;

      userId = user.body.id;
    }

    const res = await request(app.getHttpServer()).post('/core/users').send({
      phone: phoneNumber,
      password: userPassword,
      fullName: 'کاربر تستی',
    });

    const user: UserInterface = res.body as UserInterface;

    userId = user.body.id;

    const login = await request(app.getHttpServer())
      .post('/core/auth/login')
      .send({
        phone: phoneNumber,
        password: userPassword,
      });

    console.log(login.headers);
  });

  afterAll(async (): Promise<void> => await app.close());

  describe('Users Routes', () => {
    // test find all users
    it('FindAll users', async () => {
      return request(app.getHttpServer()).get('/core/users').expect(200);
    });
    // test find one user by id
    it('FindOne user by id', async () => {
      return request(app.getHttpServer())
        .get(`/core/users/${userId}`)
        .expect(200);
    });
    // test find one user by phone number
    it('FindOne user by phone', async () => {
      return request(app.getHttpServer())
        .get(`/core/users/by/phone/${phoneNumber}`)
        .expect(200);
    });
    // test create new user
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
    // test update fullName user by id
    it('Update user by id', async () => {
      return request(app.getHttpServer())
        .patch(`/core/users/update/${userId}`)
        .send({
          fullName: 'Amir Ahmadi',
        })
        .expect(200);
    });
    // test remove user by id
    it('Remove user by id', async () => {
      return request(app.getHttpServer())
        .delete(`/core/users/delete/${userId}`)
        .expect(200);
    });
  });
});
