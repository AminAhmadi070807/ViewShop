import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { OrderController } from './order.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { OrderStatusEnum } from '../../common/enums/order/order.status.enum';
import { AddressesController } from '../addresses/addresses.controller';
import { UsersController } from '../users/users.controller';

describe('Test ( Order ) Controller', () => {
  let module: TestingModule;
  let controller: OrderController;
  let addressController: AddressesController;
  let usersController: UsersController;

  let address_id: string;
  let user_id: string;

  let order_id: string;

  const address: string = 'خوی 45 متری سیستانی زاده کوچه پردیس پردیس 2';
  const alley: string = 'پردیس 2';
  const city: string = 'خوی';
  const postal_code: string = '12345678910';
  const province: string = 'آذربیجان غربی';
  const street: string = '45 متری سیستانی زاده';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<OrderController>(OrderController);
    addressController = module.get<AddressesController>(AddressesController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await controller.remove({ id: order_id });
    await addressController.remove({ id: address_id, user: user_id });
    await usersController.remove({ id: user_id, user: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersController.create({
      fullName: 'تست نام کاربری',
      password: '123456789',
      phone: '091412345698',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Address ) Controller', async () => {
    const result = await addressController.create({
      address,
      user: user_id,
      alley,
      city,
      postal_code,
      province,
      street,
    });

    address_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ user: user_id, address: address_id });

    if (result instanceof CustomException) throw result;

    order_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: order_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      status: OrderStatusEnum.WAITING,
      id: order_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Payment ) Controller', async () => {
    const result = await controller.payment({ id: order_id, user: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: order_id });

    if (result.status === 409) {
      expect(result.status).toEqual(409);
      return;
    }

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: address_id, user: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = await usersController.remove({ id: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
