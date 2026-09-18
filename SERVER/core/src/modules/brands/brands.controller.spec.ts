import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { BrandsController } from './brands.controller';

describe('Test ( Brands ) Controller', () => {
  let module: TestingModule;
  let controller: BrandsController;

  let brand_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  afterAll(async () => {
    await controller.remove({ id: brand_id })
    await module.close();
  });
});
