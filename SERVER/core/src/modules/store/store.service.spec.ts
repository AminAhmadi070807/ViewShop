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
});
