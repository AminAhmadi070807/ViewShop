import { SearchController } from './search.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

describe('Test ( Search ) Controller', () => {
  let controller: SearchController;
  let module: TestingModule;

  let search_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  afterAll(async () => {
    await controller.remove({ id: search_id });
    await module.close();
  });

  it('Test ( Search ) Controller', async () => {
    const result = await controller.search({});

    search_id = result.body.id;

    expect(result.status).toEqual(200);
  });
});
