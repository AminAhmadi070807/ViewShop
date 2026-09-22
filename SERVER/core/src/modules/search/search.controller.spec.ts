import { SearchController } from './search.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { randomInt } from 'crypto';

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
    const result = await controller.search({
      title: `unit ${randomInt(1000, 100000)} test`,
    });

    search_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: search_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
