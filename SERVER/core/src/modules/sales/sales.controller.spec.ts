import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SalesController } from './sales.controller';

describe('Test ( Sale ) Controller', () => {
  let module: TestingModule;
  let controller: SalesController;

  let report_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SalesController>(SalesController);
  });

  afterAll(async () => {
    await module.close();
  });
});
