import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { randomInt } from 'crypto';
import { UsersService } from '../users/users.service';
import { WalletService } from './wallet.service';

describe('Test ( Wallet ) Service', () => {
  let module: TestingModule;
  let service: WalletService;
  let usersService: UsersService;

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

    service = module.get<WalletService>(WalletService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await usersService.remove({ id: user_id, user: user_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await usersService.create({
      phone,
      password,
      fullName,
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Charge ) Controller', async () => {
    const result = await service.charge({
      user: user_id,
      amount,
      key,
      service: 'test',
    });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await usersService.remove({ id: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
