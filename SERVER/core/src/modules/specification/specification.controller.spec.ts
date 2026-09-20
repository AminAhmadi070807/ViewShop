import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationController } from './specification.controller';
import { AppModule } from '../../app.module';

describe('Test ( Specification ) Controller', () => {
  let module: TestingModule;
  let controller: SpecificationController;

  let specification_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SpecificationController>(SpecificationController);
  });

  afterAll(async () => {
    await controller.remove({ id: specification_id });
    await module.close();
  });
});
