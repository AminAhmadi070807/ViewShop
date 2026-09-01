import { Test, TestingModule } from '@nestjs/testing';
import { ProductFiltersController } from './product-filters.controller';
import { ProductFiltersService } from './product-filters.service';

describe('ProductFiltersController', () => {
  let controller: ProductFiltersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductFiltersController],
      providers: [ProductFiltersService],
    }).compile();

    controller = module.get<ProductFiltersController>(ProductFiltersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
