import { Test, TestingModule } from '@nestjs/testing';
import { SmsSettingController } from './sms-setting.controller';
import { AppModule } from '../../app.module';

describe('Test ( Sms-Setting ) Controller', () => {
  let module: TestingModule;
  let controller: SmsSettingController;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SmsSettingController>(SmsSettingController);
  });
});
