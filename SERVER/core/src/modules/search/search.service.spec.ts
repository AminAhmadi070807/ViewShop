import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { SearchService } from './search.service';

describe('Test ( Search ) Service', () => {
  let service: SearchService;
  let module: TestingModule;

  let search_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<SearchService>(SearchService);
  });

  afterAll(async () => {
    await service.remove(search_id);
    await module.close();
  });
});
