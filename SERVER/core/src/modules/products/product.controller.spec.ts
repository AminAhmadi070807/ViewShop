import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ProductController } from './product.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { ProductStatusEnum } from '../../common/enums/products/product/status.enum';

describe('Test ( Product ) Controller', () => {
  let module: TestingModule;
  let controller: ProductController;

  let product_id: string;

  const title = 'unit test product';
  const description =
    'unit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit test';
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

    controller = module.get<ProductController>(ProductController);
  });

  afterAll(async () => {
    await controller.remove({ id: product_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
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

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: product_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update Stock ) Feature', async () => {
    const result = await controller.updateStock({
      id: product_id,
      stock: 10,
      product_detail_id: details[0].id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: product_id,
      details,
      medias,
      title,
      description,
      specification,
      discount_percent,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Controller', async () => {
    const result = await controller.updateStatus({
      id: product_id,
      status: ProductStatusEnum.ACTIVE,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: product_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
