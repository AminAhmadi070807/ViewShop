import { Test, TestingModule } from '@nestjs/testing';
import { SmsController } from './sms.controller';
import { AppModule } from '../../app.module';

describe('Test ( Sms ) Controller', () => {
  let module: TestingModule;
  let controller: SmsController;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SmsController>(SmsController);
  });

  afterAll(async () => await module.close());
});
