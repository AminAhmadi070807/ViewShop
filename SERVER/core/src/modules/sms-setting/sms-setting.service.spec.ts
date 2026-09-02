import { Test, TestingModule } from '@nestjs/testing';
import { SmsSettingService } from './sms-setting.service';

describe('SmsSettingService', () => {
  let service: SmsSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsSettingService],
    }).compile();

    service = module.get<SmsSettingService>(SmsSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
