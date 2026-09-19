import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SalesController } from './sales.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Sale ) Controller', () => {
  let module: TestingModule;
  let controller: SalesController;

  let sale_id: string;

  const user = '1c4b85ac-f889-4396-a98c-803e531037af';
  const product = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const quantity = 3;
  const price = 30000000;
  const product_price = 10000000;
  const product_detail_id = '407bba8d-635c-4da1-a973-7231e8d584e3';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SalesController>(SalesController);
  });

  afterAll(async () => {
    await controller.remove({ id: sale_id });
    await module.close();
  });

  it('Test ( Sale ) Controller', async () => {
    const result = await controller.sale({
      user,
      quantity,
      product_price,
      price,
      product,
      product_detail_id,
    });

    if (result instanceof CustomException) throw result;

    sale_id = result.body.id;

    expect(result.status).not.toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).not.toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: sale_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).not.toEqual(200);
  });
});
