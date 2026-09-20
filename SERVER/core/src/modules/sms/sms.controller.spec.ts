import { Test, TestingModule } from '@nestjs/testing';
import { SmsController } from './sms.controller';
import { AppModule } from '../../app.module';
import crypto from 'crypto';
import { SmsEnum } from '../../common/enums/sms/sms.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Sms ) Controller', () => {
  let module: TestingModule;
  let controller: SmsController;

  const message_otp = crypto.randomInt(1_000, 999_999);

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SmsController>(SmsController);
  });

  afterAll(async () => await module.close());

  it('Test ( SmsIr ) Controller', async () => {
    const result = await controller.sms({
      message: `${message_otp}`,
      section: SmsEnum.OTP,
      cell_phone: '09144676519',
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
