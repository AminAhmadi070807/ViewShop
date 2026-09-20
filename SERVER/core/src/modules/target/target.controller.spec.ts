import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { TargetController } from './target.controller';

describe('Test ( Store ) Controller', () => {
  let module: TestingModule;
  let controller: TargetController;

  let target_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<TargetController>(TargetController);
  });

  afterAll(async () => {
    await controller.remove({ id: target_id });
    await module.close();
  });
});
