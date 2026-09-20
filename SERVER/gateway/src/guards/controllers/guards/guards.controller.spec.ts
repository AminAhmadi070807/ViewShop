import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { GuardController } from './guard.controller';

describe('Test ( Guard ) Controller', () => {
  let module: TestingModule;
  let controller: GuardController;

  let feature_id: string;

  const title = 'Unit Test';
  const role_id = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<GuardController>(GuardController);
  });

  afterAll(async () => {
    controller.remove({ id: feature_id });
    await module.close();
  });
});
