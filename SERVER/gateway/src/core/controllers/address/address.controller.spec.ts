import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { AddressController } from './address.controller';
import { UsersController } from '../users/user.controller';
import { randomInt } from 'node:crypto';

describe('Test ( Address ) Controller', () => {
  let module: TestingModule;
  let controller: AddressController;
  let usersController: UsersController;

  let address_id: string;
  let user_id: string;

  const address: string = 'خوی 45 متری سیستانی زاده کوچه پردیس پردیس 2';
  const alley: string = 'پردیس 2';
  const city: string = 'خوی';
  const postal_code: string = '0123456789';
  const province: string = 'آذربیجان غربی';
  const street: string = '45 متری سیستانی زاده';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AddressController>(AddressController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    controller.remove({ id: address_id }, req);
    usersController.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.create({
        fullName: 'کاربر تستی',
        password: '00000000',
        phone: `0914${randomInt(1_000_000, 9_999_999)}`,
      }),
    )) as ResultInterface;

    if (result.status === 201) user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.create(
        { street, province, city, postal_code, alley, address },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) address_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.findAll(req),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.findOne({ id: address_id }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.remove({ id: address_id }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.remove({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
