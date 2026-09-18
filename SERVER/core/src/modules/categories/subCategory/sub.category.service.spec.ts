import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { SubCategoryService } from './sub.category.service';

describe('Test ( Sub Category ) Service', () => {
  let module: TestingModule;
  let service: SubCategoryService;

  let subCategory_id: string;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const title: string = 'Unit Test';
  const alias: string = 'unit-test';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const category: string = 'bd015464-eb0e-46c1-b5fe-bfbb4a2ea674';

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<SubCategoryService>(SubCategoryService);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await service.remove(subCategory_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(subCategory_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
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

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(subCategory_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
