import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { StoreController } from './store.controller';
import { StoreStatusEnum } from '../../../common/enums/store/store.status';
import { randomInt } from 'crypto';
import { CategoryController } from '../categories/category/category.controller';
import { UsersController } from '../users/user.controller';
import { MediaController } from '../uploads/media.controller';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

describe('Test ( Store ) Controller', () => {
  let module: TestingModule;
  let controller: StoreController;
  let categoryController: CategoryController;
  let usersController: UsersController;
  let mediaController: MediaController;

  let store_id: string;
  let logo_id: string;
  let category_id: string;
  let user_id: string;

  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const description: string = `unit test store description about unit test category and products`;
  const cell_phone = `0914${randomInt(1_000_000, 9_999_999)}`;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<StoreController>(StoreController);
    categoryController = module.get<CategoryController>(CategoryController);
    usersController = module.get<UsersController>(UsersController);
    mediaController = module.get<MediaController>(MediaController);
  });

  afterAll(async () => {
    controller.remove({ id: store_id });
    categoryController.remove({ id: category_id });
    mediaController.remove({ id: logo_id });
    usersController.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.create({
        fullName: 'کاربر تستی',
        password: '00000000',
        phone: `0914${randomInt(1_000_000, 9_999_999)}`,
      }),
    )) as ResultInterface;

    if (result.status === 201) user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const file: Express.Multer.File = {
      fieldname: 'file',
      originalname: `${crypto.randomUUID()}.jpg`,
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 1024,
      destination: '/tmp',
      filename: `${crypto.randomUUID()}.jpg`,
      path: `/tmp/${crypto.randomUUID()}.jpg`,
      buffer: Buffer.from('fake image content'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      stream: null as any,
    };

    const result = (await firstValueFrom(
      mediaController.upload(
        file,
        {
          title: crypto.randomUUID(),
          type: MediaTypeEnum.PUBLIC,
          media: crypto.randomUUID(),
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 200) logo_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      categoryController.create(
        {
          icon: logo_id,
          title: crypto.randomUUID(),
          alias: crypto.randomUUID(),
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({
        title,
        logo: logo_id,
        cell_phone,
        categories: [category_id],
        description,
      }),
    )) as ResultInterface;

    if (result.status === 201) store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: store_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: store_id, logo: logo_id, title, description }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.updateStatus({
        id: store_id,
        status: StoreStatusEnum.DELETED,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: store_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Controller', async () => {
    const result = (await firstValueFrom(
      categoryController.remove({ id: category_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = (await firstValueFrom(
      mediaController.remove({ id: logo_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.remove({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
