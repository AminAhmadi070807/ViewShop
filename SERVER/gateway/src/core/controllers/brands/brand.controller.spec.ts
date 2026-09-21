import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { BrandController } from './brand.controller';

describe('Test ( Brand ) Controller', () => {
  let module: TestingModule;
  let controller: BrandController;

  let brand_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const req = { user: { userId: user_id, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<BrandController>(BrandController);
  });

  afterAll(async () => {
    controller.remove({ id: brand_id });
    await module.close();
  });
});
