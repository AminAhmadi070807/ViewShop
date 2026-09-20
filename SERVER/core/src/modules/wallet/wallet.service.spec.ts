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

  it('Test ( Charge ) Feature', async () => {
    const result = await service.charge({
      user: '70ffcfcf-baab-4937-8269-2d80574dab56',
      amount: 100000,
      key: 'none',
      service: 'test',
    });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });
});
