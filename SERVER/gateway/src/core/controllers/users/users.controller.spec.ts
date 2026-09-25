import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { UsersController } from './user.controller';
import { randomInt } from 'crypto';

describe('Test ( Users ) Controller', () => {
  let module: TestingModule;
  let controller: UsersController;

  let user_id: string;

  const phone = `0914${randomInt(1_000_000, 9_999_999)}`;
  const fullName = 'کاربر تستی';
  const password = '000000000';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    controller.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ fullName, password, phone }),
    )) as ResultInterface;

    if (result.status === 201) user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.update({ fullName }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Profile ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.profile(req),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
