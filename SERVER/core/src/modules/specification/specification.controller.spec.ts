import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationController } from './specification.controller';
import { SpecificationService } from './specification.service';

describe('ProductFiltersController', () => {
  let controller: SpecificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecificationController],
      providers: [SpecificationService],
    }).compile();

    controller = module.get<SpecificationController>(SpecificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
