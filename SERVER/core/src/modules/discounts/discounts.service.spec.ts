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

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(discount_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: discount_id,
      user_phone,
      permitted,
      percent,
      code,
      max_discount,
      title,
      expiration,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(discount_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
