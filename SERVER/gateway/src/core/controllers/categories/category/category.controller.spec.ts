import { Test, TestingModule } from '@nestjs/testing';

import { firstValueFrom } from 'rxjs';
import { CategoryController } from './category.controller';
import { AppModule } from '../../../../app.module';
import { ResultInterface } from '../../../../common/interface/result.interface';

describe('Test ( Category ) Controller', () => {
  let module: TestingModule;
  let controller: CategoryController;

  let category_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const req = { user: { userId: user_id, role: 'ADMIN' } };

  const title: string = 'Unit Test';
  const alias: string = 'unit-test';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  afterAll(async () => await module.close());

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ icon, title, alias }, req),
    )) as ResultInterface;

    if (result.status === 201) category_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
