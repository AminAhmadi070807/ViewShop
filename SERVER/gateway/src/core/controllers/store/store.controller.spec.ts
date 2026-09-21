import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { StoreController } from './store.controller';

describe('Test ( Store ) Controller', () => {
  let module: TestingModule;
  let controller: StoreController;

  let specification_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  afterAll(async () => {
    controller.remove({ id: specification_id });
    await module.close();
  });
});
