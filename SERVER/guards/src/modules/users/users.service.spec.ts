import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UsersService } from './users.service';

describe('Test ( Users ) Service', () => {
  let module: TestingModule;
  let service: UsersService;

  let user_id: string;
  const role_id: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await service.findAll();

    if (result.body.length) user_id = result.body[0].id;

    expect(result.status).toBe(200);
  });
});
