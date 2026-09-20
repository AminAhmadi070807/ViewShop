import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { WalletService } from './wallet.service';

describe('Test ( Wallet ) Service', () => {
  let module: TestingModule;
  let service: WalletService;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<WalletService>(WalletService);
  });

  afterAll(async () => {
    await module.close();
  });
});
