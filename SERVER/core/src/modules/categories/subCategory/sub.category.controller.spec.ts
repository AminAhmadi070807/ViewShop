import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoryController } from './sub.category.controller';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { UsersController } from '../../users/users.controller';
import { MediaController } from '../../media/media.controller';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';
import { CategoriesController } from '../category/categories.controller';

describe('Test ( Sub Category ) Controller', () => {
  let module: TestingModule;
  let controller: SubCategoryController;
  let usersController: UsersController;
  let mediaController: MediaController;
  let categoriesController: CategoriesController;

  let subCategory_id: string;
  let user_id: string;
  let icon_id: string;
  let category_id: string;

  const title: string = 'Unit Controller Test';
  const alias: string = 'unit-controller-test';

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SubCategoryController>(SubCategoryController);
    usersController = module.get<UsersController>(UsersController);
    mediaController = module.get<MediaController>(MediaController);
    categoriesController =
      module.get<CategoriesController>(CategoriesController);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await controller.remove({ id: subCategory_id });
    await mediaController.remove({ id: icon_id });
    await usersController.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersController.create({
      phone: '09141234567',
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaController.create({
      title,
      user: user_id,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    icon_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const result = await categoriesController.create({
      user: user_id,
      title,
      alias,
      icon: icon_id,
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
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
      icon: icon_id,
      title,
      alias,
      category: category_id,
      user: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: subCategory_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Controller', async () => {
    const result = await categoriesController.remove({ id: category_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaController.remove({
      id: icon_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = await usersController.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
