import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { StoreService } from './store.service';
import { CategoriesService } from '../categories/category/categories.service';
import { UsersService } from '../users/users.service';
import { MediaService } from '../media/media.service';
import { randomUUID } from 'node:crypto';
import { randomInt } from 'crypto';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';

describe('Test ( Store ) Service', () => {
  let module: TestingModule;
  let service: StoreService;
  let categoriesService: CategoriesService;
  let usersService: UsersService;
  let mediaService: MediaService;

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

    service = module.get<StoreService>(StoreService);
    categoriesService = module.get<CategoriesService>(CategoriesService);
    usersService = module.get<UsersService>(UsersService);
    mediaService = module.get<MediaService>(MediaService);
  });

  afterAll(async () => {
    await service.remove(store_id);
    await service.remove(category_id);
    await mediaService.remove(logo_id);
    await usersService.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Feature', async () => {
    const result = await usersService.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Feature', async () => {
    const result = await mediaService.create({
      title: crypto.randomUUID(),
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    logo_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Feature', async () => {
    const result = await categoriesService.create({
      user: user_id,
      title: crypto.randomUUID(),
      alias: crypto.randomUUID(),
      icon: logo_id,
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne({ id: store_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: store_id,
      logo: logo_id,
      title,
      description,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Feature', async () => {
    const result = await service.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(store_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Feature', async () => {
    const result = await categoriesService.remove(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaService.remove(logo_id);

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
