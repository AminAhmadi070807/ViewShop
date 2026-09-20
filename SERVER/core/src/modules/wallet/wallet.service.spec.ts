import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { WalletService } from './wallet.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Wallet ) Service', () => {
  let module: TestingModule;
  let service: WalletService;

  const user = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const amount = 100000000000;
  const key = crypto.randomUUID();

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
    const result = await service.charge({ user, amount, key, service: 'test' });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( Payment ) Feature', async () => {
    const result = await service.payment({ user, amount });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
