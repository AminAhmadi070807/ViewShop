import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { WalletController } from './wallet.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { randomInt } from 'crypto';
import { UsersController } from '../users/users.controller';

describe('Test ( Wallet ) Controller', () => {
  let module: TestingModule;
  let controller: WalletController;
  let usersController: UsersController;

  let user_id: string;

  const phone = `0914${randomInt(1_000_000, 9_999_999)}`;
  const fullName = 'کاربر تستی';
  const password = `${randomInt(1_000_000_000, 999_999_999_999)}`;

  const amount = 100000000000;
  const key = crypto.randomUUID();

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<WalletController>(WalletController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await usersController.remove({ id: user_id, user: user_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await usersController.create({
      phone,
      password,
      fullName,
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Charge ) Controller', async () => {
    const result = await controller.charge({
      user: user_id,
      amount,
      key,
      service: 'test',
    });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await usersController.remove({ id: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
