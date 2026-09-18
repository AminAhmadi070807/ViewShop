import { Test, TestingModule } from '@nestjs/testing';
import { DiscountsController } from './discounts.controller';
import { AppModule } from '../../app.module';
import crypto from 'crypto';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Discount ) Controller', () => {
  let module: TestingModule;
  let controller: DiscountsController;

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

    controller = module.get<DiscountsController>(DiscountsController);
  });

  afterAll(async () => {
    await controller.remove({ id: discount_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      expiration,
      user_phone,
      permitted,
      percent,
      code,
      max_discount,
      title,
    });

    if (result instanceof CustomException) throw result;

    discount_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: discount_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
