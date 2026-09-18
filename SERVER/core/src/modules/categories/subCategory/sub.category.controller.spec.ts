import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoryController } from './sub.category.controller';
import { AppModule } from '../../../app.module';

describe('Test ( Sub Category ) Controller', () => {
  let module: TestingModule;
  let controller: SubCategoryController;

  let subCategory_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SubCategoryController>(SubCategoryController);
  });

  afterAll(async () => {
    await controller.remove({ id: subCategory_id });
    await module.close();
  });
});
