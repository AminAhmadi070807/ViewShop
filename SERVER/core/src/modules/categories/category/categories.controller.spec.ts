import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';

describe('Test ( Categories ) Controller', () => {
  let module: TestingModule;
  let controller: CategoriesController;

  let category_id: string;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const title: string = 'Unit Test';
  const alias: string = 'unit-test';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  afterAll(async () => {
    await controller.remove({ id: category_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ user, title, alias, icon });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(201);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: category_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(201);
  });
});
