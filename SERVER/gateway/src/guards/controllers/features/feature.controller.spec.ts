import { Test, TestingModule } from '@nestjs/testing';
import { FeatureController } from './feature.controller';
import { AppModule } from '../../../app.module';

describe('Test ( Create ) Controller', () => {
  let module: TestingModule;
  let controller: FeatureController;

  let feature_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<FeatureController>(FeatureController);
  });

  afterAll(async () => {
    controller.remove({ id: feature_id });
    await module.close();
  });
});
