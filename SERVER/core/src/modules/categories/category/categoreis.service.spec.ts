import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { CategoriesService } from './categories.service';

describe('Test ( Categories ) Controller', () => {
  let module: TestingModule;
  let service: CategoriesService;

  let category_id: string;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const title: string = 'Unit Test';
  const alias: string = 'unit-test';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  afterAll(async () => {
    await service.remove({ id: category_id });
    await module.close();
  });
});
