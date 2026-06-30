import { Test, TestingModule } from '@nestjs/testing';
import { TargetService } from './target.service';

describe('TargetService', () => {
  let service: TargetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TargetService],
    }).compile();

    service = module.get<TargetService>(TargetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
