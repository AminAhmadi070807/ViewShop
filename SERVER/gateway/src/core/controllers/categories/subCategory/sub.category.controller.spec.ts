import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom } from 'rxjs';
import { AppModule } from '../../../../app.module';
import { ResultInterface } from '../../../../common/interface/result.interface';
import { SubCategoryController } from './sub.category.controller';

describe('Test ( SubCategory ) Controller', () => {
  let module: TestingModule;
  let controller: SubCategoryController;

  let subCategory_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const req = { user: { userId: user_id, role: 'ADMIN' } };

  const title: string = 'Unit Test';
  const alias: string = 'unit-test';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const category: string = 'bd015464-eb0e-46c1-b5fe-bfbb4a2ea674';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SubCategoryController>(SubCategoryController);
  });

  afterAll(async () => {
    controller.remove({ id: subCategory_id });
    await module.close();
  });
});
