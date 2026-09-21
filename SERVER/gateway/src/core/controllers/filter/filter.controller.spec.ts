import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { FilterController } from './filter.controller';

describe('Test ( Comment ) Controller', () => {
  let module: TestingModule;
  let controller: FilterController;

  let filter_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<FilterController>(FilterController);
  });

  afterAll(async () => {
    controller.remove({ id: filter_id });
    await module.close();
  });
});
