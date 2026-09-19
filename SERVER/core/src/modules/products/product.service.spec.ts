import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ProductController } from './product.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { ProductStatusEnum } from '../../common/enums/products/product/status.enum';
import { ProductService } from './product.service';

describe('Test ( Product ) Service', () => {
  let module: TestingModule;
  let service: ProductService;

  let product_id: string;

  const title = 'unit test product';
  const description =
    'unit test product description this description for was unit test';
  const brand = 'c8d1ea72-ee70-4f1e-a224-30ec3005db2e';
  const userId = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const specification = 'ab7352d1-1925-42a8-8d7f-84cb300e1fec';
  const store = 'b5a11a85-f5d8-430b-be0f-c8892656dbba';
  const discount_percent = 0;
  const details = [
    {
      id: crypto.randomUUID(),
      color: 'f48533d3-cc90-4d78-b9ec-b85bfb261e53',
      price: 100000000,
      stock: 1000,
    },
  ];
  const medias = [
    'a84db0d5-611b-4873-9dfc-93e350ef8c85',
    '1d60805f-2cd9-4dbb-be6f-8ce320d44229',
    '6f9b7b2f-c60a-4dfe-909e-9107e9ccf9fd',
  ];
  const alias = 'unit-test-product';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterAll(async () => {
    await service.remove(product_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      title,
      description,
      brand,
      userId,
      store,
      specification,
      discount_percent,
      details,
      medias,
      alias,
    });

    if (result instanceof CustomException) throw result;

    product_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll({});

    expect(result.status).toEqual(200);
  });
});
