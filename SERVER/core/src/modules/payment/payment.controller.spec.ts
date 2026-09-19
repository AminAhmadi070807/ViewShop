import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PaymentController } from './payment.controller';

describe('Test ( Payment ) Controller', () => {
  let module: TestingModule;
  let controller: PaymentController;

  let payment_id: string;

  beforeEach(() => jest.restoreAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  afterAll(async () => {
    // await service.remove(payment_id);
    await module.close();
  });
});
