import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom } from 'rxjs';
import { AppModule } from '../../../../app.module';
import { ResultInterface } from '../../../../common/interface/result.interface';
import { AttributeController } from './attribute.controller';

describe('Test ( Attribute ) Controller', () => {
  let module: TestingModule;
  let controller: AttributeController;

  let subCategory_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const req = { user: { userId: user_id, role: 'ADMIN' } };

  const title: string = 'Unit Test';
  const alias: string = 'unit-test';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const subCategory: string = 'e11cf198-443d-48ba-93c9-25750fc80fb2';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AttributeController>(AttributeController);
  });

  afterAll(async () => {
    controller.remove({ id: subCategory_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ icon, title, alias, subCategory }, req),
    )) as ResultInterface;

    if (result.status === 201) subCategory_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
