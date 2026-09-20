import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { StoreController } from './store.controller';

describe('Test ( Specification ) Controller', () => {
  let module: TestingModule;
  let controller: StoreController;

  let store_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  afterAll(async () => {
    await module.close();
  });
});
