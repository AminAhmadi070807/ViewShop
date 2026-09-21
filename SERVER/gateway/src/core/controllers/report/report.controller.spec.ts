import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ReportController } from './report.controller';
describe('Test ( Product ) Controller', () => {
  let module: TestingModule;
  let controller: ReportController;

  let product_id: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const title: string = 'Unit Test';
  const description: string = 'unit test description';
  const target: string = 'aa3d8798-06ef-445d-8781-2df58cba302b';

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  afterAll(async () => {
    controller.remove({ id: product_id });
    await module.close();
  });
});
