import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSettingsController } from './payment.setting.controller';
import { AppModule } from '../../../app.module';

describe('Test ( Payment Setting ) Controller', () => {
  let module: TestingModule;
  let controller: PaymentSettingsController;

  let payment_id: string;

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
});
