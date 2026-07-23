import { Test, TestingModule } from '@nestjs/testing';
import { FilterTypeController } from './filter-type.controller';
import { FilterTypeService } from './filter-type.service';

describe('FilterTypeController', () => {
  let controller: FilterTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilterTypeController],
      providers: [FilterTypeService],
    }).compile();

    controller = module.get<FilterTypeController>(FilterTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
