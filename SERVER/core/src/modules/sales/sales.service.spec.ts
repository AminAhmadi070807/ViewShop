import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SalesFeature } from './sales.Feature';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { SalesService } from './sales.service';

describe('Test ( Sale ) Service', () => {
  let module: TestingModule;
  let service: SalesService;

  let sale_id: string;

  const user = '1c4b85ac-f889-4396-a98c-803e531037af';
  const product = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const quantity = 3;
  const price = 30000000;
  const product_price = 10000000;
  const product_detail_id = '407bba8d-635c-4da1-a973-7231e8d584e3';
  const store = 'b5a11a85-f5d8-430b-be0f-c8892656dbba';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<SalesService>(SalesService);
  });

  afterAll(async () => {
    await service.remove(sale_id);
    await module.close();
  });

  it('Test ( Sale ) Feature', async () => {
    const result = await service.sale({
      user,
      quantity,
      product_price,
      price,
      product,
      product_detail_id,
    });

    if (result instanceof CustomException) throw result;

    sale_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(sale_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
