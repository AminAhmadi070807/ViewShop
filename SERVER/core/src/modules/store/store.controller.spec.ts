import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { StoreController } from './store.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';

describe('Test ( Store ) Controller', () => {
  let module: TestingModule;
  let controller: StoreController;

  let store_id: string;

  const title: string = 'Unit Test';
  const description: string =
    'unit test store description about unit test category and products';
  const logo: string = '45c10326-79e9-453f-9890-e725a95ef4f8';
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

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: store_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: store_id,
      logo,
      title,
      description,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Controller', async () => {
    const result = await controller.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: store_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
