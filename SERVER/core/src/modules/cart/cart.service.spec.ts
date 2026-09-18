import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CartService } from './cart.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Cart ) Controller', () => {
  let module: TestingModule;
  let service: CartService;

  const user_id: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const quantity: number = 1;
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const product_detail_id: string = '407bba8d-635c-4da1-a973-7231e8d584e3';
  const color: string = 'f28015ab-8038-4f39-a544-e4954ef0e5ac';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<CartService>(CartService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      user: user_id,
      quantity,
      product,
      product_detail_id,
      color,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne({ id: user_id, user: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
