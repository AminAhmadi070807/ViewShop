import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { WalletController } from './wallet.controller';

describe('Test ( Wallet ) Controller', () => {
  let module: TestingModule;
  let controller: WalletController;

  const user = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const amount = 100000000000;
  const key = crypto.randomUUID();

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( Charge ) Controller', async () => {
    const result = await controller.charge({
      user,
      amount,
      key,
      service: 'test',
    });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });
});
