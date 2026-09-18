import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { AppModule } from '../../../app.module';

describe('Test ( Categories ) Controller', () => {
  let module: TestingModule;
  let controller: CategoriesController;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });
});
