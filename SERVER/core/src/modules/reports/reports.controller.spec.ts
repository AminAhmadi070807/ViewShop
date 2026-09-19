import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { AppModule } from '../../app.module';

describe('Test ( Report ) Controller', () => {
  let module: TestingModule;
  let controller: ReportsController;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  afterAll(async () => {
    await module.close();
  });
});
