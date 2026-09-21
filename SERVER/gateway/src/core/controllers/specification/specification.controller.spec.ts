import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { SpecificationController } from './specification.controller';

describe('Test ( Specification ) Controller', () => {
  let module: TestingModule;
  let controller: SpecificationController;

  const specification_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SpecificationController>(SpecificationController);
  });

  afterAll(async () => {
    controller.remove({ id: specification_id });
    await module.close();
  });
});
