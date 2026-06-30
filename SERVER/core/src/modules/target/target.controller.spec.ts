import { Test, TestingModule } from '@nestjs/testing';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';

describe('TargetController', () => {
  let controller: TargetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TargetController],
      providers: [TargetService],
    }).compile();

    controller = module.get<TargetController>(TargetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
