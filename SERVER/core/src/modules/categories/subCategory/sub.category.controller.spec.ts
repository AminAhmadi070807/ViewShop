import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoryController } from './sub.category.controller';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';

describe('Test ( Sub Category ) Controller', () => {
  let module: TestingModule;
  let controller: SubCategoryController;

  let subCategory_id: string;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const title: string = 'Unit Test';
  const alias: string = 'unit-test';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const category: string = 'bd015464-eb0e-46c1-b5fe-bfbb4a2ea674';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SubCategoryController>(SubCategoryController);
  });

  afterAll(async () => {
    await controller.remove({ id: subCategory_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      user,
      icon,
      title,
      alias,
      category,
    });

    if (result instanceof CustomException) throw result;

    subCategory_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: subCategory_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: subCategory_id,
      icon,
      title,
      alias,
      category,
      user,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: subCategory_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
