import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { StoreController } from './store.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { StoreService } from './store.service';

describe('Test ( Store ) Service', () => {
  let module: TestingModule;
  let service: StoreService;

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

    service = module.get<StoreService>(StoreService);
  });

  afterAll(async () => {
    await service.remove(store_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne({ id: store_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: store_id,
      logo,
      title,
      description,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Feature', async () => {
    const result = await service.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(store_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
