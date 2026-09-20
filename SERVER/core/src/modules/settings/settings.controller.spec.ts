import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { AppModule } from '../../app.module';

describe('Test ( Setting ) Controller', () => {
  let module: TestingModule;
  let controller: SettingsController;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SettingsController>(SettingsController);
  });

  afterAll(async () => {
    await controller.empty();
    await module.close();
  });
});
