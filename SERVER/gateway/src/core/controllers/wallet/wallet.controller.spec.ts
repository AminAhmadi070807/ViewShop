import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { WalletController } from './wallet.controller';

describe('Test ( Wallet ) Controller', () => {
  let module: TestingModule;
  let controller: WalletController;

  const user = '1c4b85ac-f889-4396-a98c-803e531037af';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  afterAll(async () => await module.close());

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(201);
  });
});
