import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { SearchController } from './search.controller';

describe('Test ( Report ) Controller', () => {
  let module: TestingModule;
  let controller: SearchController;

  let search_id: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const title: string = 'Unit Test';

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  afterAll(async () => {
    controller.remove({ id: search_id });
    await module.close();
  });
});
