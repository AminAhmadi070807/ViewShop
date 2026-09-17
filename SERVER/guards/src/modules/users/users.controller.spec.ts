import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UsersController } from './users.controller';

describe('Test ( Users ) Controller', () => {
  let module: TestingModule;
  let controller: UsersController;

  let user_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    if (result.body.length) user_id = result.body[0].id;

    expect(result.status).toBe(200);
  });
});
