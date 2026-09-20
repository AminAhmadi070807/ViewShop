import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { TargetController } from './target.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { TargetService } from './target.service';

describe('Test ( Store ) Service', () => {
  let module: TestingModule;
  let service: TargetService;

  let target_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<TargetService>(TargetService);
  });

  afterAll(async () => {
    await service.remove(target_id);
    await module.close();
  });
});
