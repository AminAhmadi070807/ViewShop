import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { StoreController } from './store.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Specification ) Controller', () => {
  let module: TestingModule;
  let controller: StoreController;

  let store_id: string;

  const title: string = 'Unit Test';
  const description: string =
    'unit test store description about unit test category and products';
  const logo: string = '4768afb7-031c-4d23-b11f-8781efb4ce11';
  const cell_phone = '09999999999';
  const categories = ['bd015464-eb0e-46c1-b5fe-bfbb4a2ea674'];

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  afterAll(async () => {
    await controller.remove({ id: store_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      title,
      description,
      logo,
      cell_phone,
      categories,
    });

    if (result instanceof CustomException) throw result;

    store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });
});
