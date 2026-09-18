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
    await service.remove(category_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ user, title, alias, icon });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: category_id,
      icon,
      title,
      alias,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
