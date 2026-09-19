import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSettingsController } from './payment.setting.controller';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';

describe('Test ( Payment Setting ) Controller', () => {
  let module: TestingModule;
  let controller: PaymentSettingsController;

  let payment_id: string;

  const payment_key = crypto.randomUUID();
  const max_price = 100000000000000000;
  const details = [{ title: 'مسیر برگشت', pattern: 'uuu', value: '' }];
  const call_back = 'https://sabzlearn.ir/call-back/api';
  const alias = 'ZOMAD';
  const title = 'زوماد';
  const api = 'https://sabzlearn.ir/api/api';
  const media = '7c0d1017-5f27-4d25-84e8-f64fea649afb';

  beforeEach(() => jest.restoreAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<PaymentSettingsController>(
      PaymentSettingsController,
    );
  });

  afterAll(async () => {
    await controller.remove({ id: payment_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      media,
      api,
      title,
      alias,
      call_back,
      details,
      max_price,
      payment_key,
    });

    if (result instanceof CustomException) throw result;

    payment_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: payment_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: payment_id,
      details,
      max_price,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Controller', async () => {
    const result = await controller.updateStatus({ id: payment_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: payment_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
