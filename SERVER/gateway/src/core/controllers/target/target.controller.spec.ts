import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { TargetController } from './target.controller';

describe('Test ( Target ) Controller', () => {
  let module: TestingModule;
  let controller: TargetController;

  let target_id: string;

  const title = 'unit test';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<TargetController>(TargetController);
  });

  afterAll(async () => {
    controller.remove({ id: target_id });
    await module.close();
  });
});
