import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ProductController } from './product.controller';

describe('Test ( Product ) Controller', () => {
  let module: TestingModule;
  let controller: ProductController;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  afterAll(async () => {
    await module.close();
  });
});
