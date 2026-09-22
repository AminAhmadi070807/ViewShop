import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { SubCategoryService } from './sub.category.service';
import { UsersService } from '../../users/users.service';
import { MediaService } from '../../media/media.service';
import { CategoriesService } from '../category/categories.service';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

describe('Test ( Sub Category ) Service', () => {
  let module: TestingModule;
  let service: SubCategoryService;
  let usersService: UsersService;
  let mediaService: MediaService;
  let categoriesService: CategoriesService;

  let subCategory_id: string;
  let user_id: string;
  let icon_id: string;
  let category_id: string;

  const title: string = 'Unit Service Test';
  const alias: string = 'unit-service-test';

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<SubCategoryService>(SubCategoryService);
    usersService = module.get<UsersService>(UsersService);
    mediaService = module.get<MediaService>(MediaService);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await service.remove(subCategory_id);
    await module.close();
  });

  it('Test ( Create User ) Feature', async () => {
    const result = await usersService.create({
      phone: '09141234567',
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Feature', async () => {
    const result = await mediaService.create({
      title,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    icon_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Feature', async () => {
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

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      user: user_id,
      icon: icon_id,
      title,
      alias,
      category: category_id,
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
      icon: icon_id,
      title,
      alias,
      category: category_id,
      user: user_id,
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
