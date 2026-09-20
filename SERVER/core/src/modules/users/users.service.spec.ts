import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Test ( Users ) Service', () => {
  let module: TestingModule;
  let service: UsersService;

  let user_id: string;

  const phone = '09990009999';
  const fullName = 'کاربر تستی';
  const password = '000000000';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await service.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      phone,
      password,
      fullName,
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
