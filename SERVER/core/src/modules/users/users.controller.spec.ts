import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { UsersController } from './users.controller';

describe('Test ( Users ) Controller', () => {
  let module: TestingModule;
  let controller: UsersController;

  let user_id: string;

  const phone = '09990009999';
  const fullName = 'کاربر تستی';
  const password = '000000000';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await controller.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      phone,
      password,
      fullName,
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: user_id,
      fullName,
      user: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
