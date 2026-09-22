import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { StoreController } from './store.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { randomUUID } from 'node:crypto';
import { randomInt } from 'crypto';
import { UsersController } from '../users/users.controller';
import { CategoriesController } from '../categories/category/categories.controller';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { MediaController } from '../media/media.controller';

describe('Test ( Store ) Controller', () => {
  let module: TestingModule;
  let controller: StoreController;
  let usersController: UsersController;
  let categoriesController: CategoriesController;
  let mediaController: MediaController;

  let store_id: string;
  let user_id: string;
  let category_id: string;
  let logo_id: string;

  const title: string = `Unit ${randomUUID()} Test`;
  const description: string =
    'unit test store description about unit test category and products';
  const cell_phone = `0914${randomInt(1000000, 9999999)}`;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<StoreController>(StoreController);
    usersController = module.get<UsersController>(UsersController);
    categoriesController =
      module.get<CategoriesController>(CategoriesController);
    mediaController = module.get<MediaController>(MediaController);
  });

  afterAll(async () => {
    await controller.remove({ id: store_id });
    await usersController.remove({ id: user_id });
    await mediaController.remove({ id: logo_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersController.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
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

    logo_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Categories ) Controller', async () => {
    const result = await categoriesController.create({
      title: crypto.randomUUID(),
      user: user_id,
      icon: logo_id,
      alias: crypto.randomUUID(),
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      title,
      description,
      logo: logo_id,
      cell_phone,
      categories: [category_id],
    });

    if (result instanceof CustomException) throw result;

    store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: store_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: store_id,
      logo: logo_id,
      title,
      description,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Controller', async () => {
    const result = await controller.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: store_id });

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
      id: logo_id,
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
