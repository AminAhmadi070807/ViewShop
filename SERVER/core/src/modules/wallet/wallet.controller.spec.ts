import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { WalletController } from './wallet.controller';

describe('Test ( Users ) Controller', () => {
  let module: TestingModule;
  let controller: WalletController;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  afterAll(async () => {
    await module.close();
  });
});
