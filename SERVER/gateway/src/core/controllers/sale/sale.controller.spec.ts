import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { SaleController } from './sale.controller';

describe('Test ( Sale ) Controller', () => {
  let module: TestingModule;
  let controller: SaleController;

  let report_id: string;

  const user = '1c4b85ac-f889-4396-a98c-803e531037af';
  const product = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const quantity = 3;
  const price = 30000000;
  const product_price = 10000000;
  const product_detail_id = '407bba8d-635c-4da1-a973-7231e8d584e3';
  const store = 'b5a11a85-f5d8-430b-be0f-c8892656dbba';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SaleController>(SaleController);
  });

  afterAll(async () => {
    controller.remove({ id: report_id });
    await module.close();
  });
});
