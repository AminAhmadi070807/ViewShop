import { Test, TestingModule } from '@nestjs/testing';
import { ZarinPalController } from './zarin-pal.controller';
import { ZarinPalService } from './zarin-pal.service';

describe('ZarinPalController', () => {
  let controller: ZarinPalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZarinPalController],
      providers: [ZarinPalService],
    }).compile();

    controller = module.get<ZarinPalController>(ZarinPalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
