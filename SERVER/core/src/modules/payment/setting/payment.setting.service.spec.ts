import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { PaymentSettingService } from './payment.setting.service';

describe('Test ( Payment Setting ) Feature', () => {
  let module: TestingModule;
  let service: PaymentSettingService;

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

    service = module.get<PaymentSettingService>(PaymentSettingService);
  });

  afterAll(async () => {
    await service.remove(payment_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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
});
