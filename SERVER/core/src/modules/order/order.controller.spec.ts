import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { OrderController } from './order.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { OrderStatusEnum } from '../../common/enums/order/order.status.enum';

describe('Test ( Order ) Controller', () => {
  let module: TestingModule;
  let controller: OrderController;

  let order_id: string;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const address: string = '499b6fc9-2f5a-4a5d-899b-c7e5e32aab4d';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterAll(async () => {
    await controller.remove({ id: order_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ user, address });

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
    const result = await controller.payment({ id: order_id, user });

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
});
