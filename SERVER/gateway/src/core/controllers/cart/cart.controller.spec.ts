import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { CartController } from './cart.controller';

describe('Test ( Cart ) Controller', () => {
  let module: TestingModule;
  let controller: CartController;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const quantity: number = 1;
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const product_detail_id: string = '407bba8d-635c-4da1-a973-7231e8d584e3';
  const color: string = 'f28015ab-8038-4f39-a544-e4954ef0e5ac';

  const req = { user: { userId: user_id, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<CartController>(CartController);
  });

  afterAll(async () => await module.close());

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ color, product, product_detail_id, quantity }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne(req),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });
});
