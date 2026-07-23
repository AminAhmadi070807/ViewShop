import { Test, TestingModule } from '@nestjs/testing';
import { FilterTypeService } from './filter-type.service';

describe('FilterTypeService', () => {
  let service: FilterTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterTypeService],
    }).compile();

    service = module.get<FilterTypeService>(FilterTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
