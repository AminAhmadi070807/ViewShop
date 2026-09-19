import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { LikeController } from './like.controller';

describe('Test ( Like ) Controller', () => {
  let module: TestingModule;
  let controller: LikeController;

  const user: string = 'Unit Test';
  const product: string = 'Unit Test';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  afterAll(async () => {
    await controller.toggle({ product, user });
    await module.close();
  });
});
