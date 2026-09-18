import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import crypto from 'crypto';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { DiscountsService } from './discounts.service';

describe('Test ( Discount ) Controller', () => {
  let module: TestingModule;
  let service: DiscountsService;

  let discount_id: string;

  const user_phone: string = '09144676519';
  const title: string = 'Unit Test';
  const expiration: Date = new Date();
  const permitted: number = 10;
  const percent: number = 10;
  const code: string = `${crypto.randomInt(1_000_000, 999_999_999)}`;
  const max_discount: number = 1000;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<DiscountsService>(DiscountsService);
  });

  afterAll(async () => {
    await service.remove(discount_id);
    await module.close();
  });
});
