import { Test, TestingModule } from '@nestjs/testing';
import { SmsSettingController } from './sms-setting.controller';
import { SmsSettingService } from './sms-setting.service';

describe('SmsSettingController', () => {
  let controller: SmsSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsSettingController],
      providers: [SmsSettingService],
    }).compile();

    controller = module.get<SmsSettingController>(SmsSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
