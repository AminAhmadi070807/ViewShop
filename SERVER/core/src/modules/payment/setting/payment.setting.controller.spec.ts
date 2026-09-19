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
  const call_back = 'https://sabzlearn.ir';
  const alias = 'zomad';
  const title = 'زوماد';
  const api = 'https://sabzlearn.ir';
  const media = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';

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
});
