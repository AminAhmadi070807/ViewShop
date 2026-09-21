import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ProductController } from './product.controller';

describe('Test ( Product ) Controller', () => {
  let module: TestingModule;
  let controller: ProductController;

  let product_id: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const title = 'unit test product';
  const description =
    'unit test product description this description for was unit test';
  const brand = 'c8d1ea72-ee70-4f1e-a224-30ec3005db2e';
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

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  afterAll(async () => {
    controller.remove({ id: product_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create(
        {
          description,
          alias,
          medias,
          details,
          discount_percent,
          specification,
          store,
          brand,
          title,
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) product_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: product_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update Stock ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.updateStock({
        id: product_id,
        stock: 10,
        product_detail_id: details[0].id,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({
        id: product_id,
        discount_percent,
        specification,
        title,
        medias,
        details,
        description,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
