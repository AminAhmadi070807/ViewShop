import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { OrderController } from './order.controller';
import { OrderStatusEnum } from '../../../common/enums/order/order.status.enum';

describe('Test ( Order ) Controller', () => {
  let module: TestingModule;
  let controller: OrderController;

  let order_id: string;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const address: string = '499b6fc9-2f5a-4a5d-899b-c7e5e32aab4d';

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterAll(async () => {
    controller.remove({ id: order_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ address }, req),
    )) as ResultInterface;

    if (result.status === 201) order_id = result.body.id;

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
      controller.findOne({ id: order_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: order_id, status: OrderStatusEnum.FAILED }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Payment ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.payment({ id: order_id }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: order_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
