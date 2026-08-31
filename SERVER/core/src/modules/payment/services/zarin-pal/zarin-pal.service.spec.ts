import { Test, TestingModule } from '@nestjs/testing';
import { ZarinPalService } from './zarin-pal.service';

describe('ZarinPalService', () => {
  let service: ZarinPalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZarinPalService],
    }).compile();

    service = module.get<ZarinPalService>(ZarinPalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
