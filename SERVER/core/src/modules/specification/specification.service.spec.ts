import { Test, TestingModule } from '@nestjs/testing';
import { ProductFiltersService } from './specification.service';

describe('ProductFiltersService', () => {
  let service: ProductFiltersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFiltersService],
    }).compile();

    service = module.get<ProductFiltersService>(ProductFiltersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
