import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { AttributeService } from './attribute.service';
import { UsersService } from '../../users/users.service';
import { MediaService } from '../../media/media.service';
import { CategoriesService } from '../category/categories.service';
import { SubCategoryService } from '../subCategory/sub.category.service';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';
import { randomInt } from 'crypto';

describe('Test ( Attribute ) Service', () => {
  let module: TestingModule;
  let service: AttributeService;
  let usersService: UsersService;
  let mediaService: MediaService;
  let categoriesService: CategoriesService;
  let subCategoriesService: SubCategoryService;

  let attribute_id: string;
  let category_id: string;
  let sub_category_id: string;
  let user_id: string;
  let icon_id: string;

  const title: string = `Unit Service ${randomInt(100, 10000)} Test`;
  const alias: string = `Unit-Service-${randomInt(100, 10000)}-Test`;

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<AttributeService>(AttributeService);
    usersService = module.get<UsersService>(UsersService);
    mediaService = module.get<MediaService>(MediaService);
    categoriesService = module.get<CategoriesService>(CategoriesService);
    subCategoriesService = module.get<SubCategoryService>(SubCategoryService);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await service.remove(attribute_id);
    await subCategoriesService.remove(sub_category_id);
    await categoriesService.remove(category_id);
    await mediaService.remove(icon_id);
    await usersService.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersService.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaService.create({
      title,
      user: user_id,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    icon_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const result = await categoriesService.create({
      user: user_id,
      title,
      alias,
      icon: icon_id,
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Sub Category ) Feature', async () => {
    const result = await subCategoriesService.create({
      user: user_id,
      icon: icon_id,
      title,
      alias,
      category: category_id,
    });

    if (result instanceof CustomException) throw result;

    sub_category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      alias,
      user: user_id,
      title,
      icon: icon_id,
      subCategory: sub_category_id,
    });

    if (result instanceof CustomException) throw result;

    attribute_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await service.findOne(attribute_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await service.remove(attribute_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Sub Category ) Controller', async () => {
    const result = await subCategoriesService.remove(sub_category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Controller', async () => {
    const result = await categoriesService.remove(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaService.remove(icon_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = await usersService.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
