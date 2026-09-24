import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ArticleController } from './article.controller';
import {
  ArticleStatusEnum,
  UpdateArticleStatusEnum,
} from '../../../common/enums/articles/articles.enum';
import { UsersController } from '../users/user.controller';
import { StoreController } from '../store/store.controller';
import { MediaController } from '../uploads/media.controller';
import { randomInt } from 'node:crypto';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';
import { CategoryController } from '../categories/category/category.controller';
import { StoreStatusEnum } from '../../../common/enums/store/store.status';

describe('Test ( Article ) Controller', () => {
  let module: TestingModule;
  let controller: ArticleController;
  let usersController: UsersController;
  let storeController: StoreController;
  let mediaController: MediaController;
  let categoryController: CategoryController;

  let article_id: string;

  let user_id: string;
  let category_id: string;
  let store_id: string;
  let cover_id: string;

  const title: string = `Unit ${crypto.randomUUID()} Article`;
  const description: string =
    'لبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const slug = ['test', 'unit test', 'test unit'];
  const shortDescription: string =
    ' راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ArticleController>(ArticleController);
    usersController = module.get<UsersController>(UsersController);
    storeController = module.get<StoreController>(StoreController);
    mediaController = module.get<MediaController>(MediaController);
    categoryController = module.get<CategoryController>(CategoryController);
  });

  afterAll(async () => {
    controller.remove({ id: article_id });
    storeController.remove({ id: store_id });
    categoryController.remove({ id: category_id });
    mediaController.remove({ id: cover_id });
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
      originalname: 'test.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 1024,
      destination: '/tmp',
      filename: 'test.jpg',
      path: '/tmp/test.jpg',
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

    if (result.status === 200) cover_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      categoryController.create(
        {
          icon: cover_id,
          title: crypto.randomUUID(),
          alias: crypto.randomUUID(),
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Store ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.create({
        title,
        logo: cover_id,
        cell_phone: `0914${randomInt(1000000, 9999999)}`,
        categories: [category_id],
        description,
      }),
    )) as ResultInterface;

    if (result.status === 201) store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.updateStatus({
        id: store_id,
        status: StoreStatusEnum.PENDING,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.create(
        {
          shortDescription,
          cover: cover_id,
          description,
          title,
          store: store_id,
          category: category_id,
          slug,
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) article_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;
    console.log(result);

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.update(
        {
          id: article_id,
          slug,
          description,
          title,
          shortDescription,
          cover: cover_id,
          category: category_id,
          status: UpdateArticleStatusEnum.CONPLETION,
        },
        req,
      ),
    )) as ResultInterface;
    console.log(result);

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.updateStatus({
        id: article_id,
        status: ArticleStatusEnum.PUBLISHED,
      }),
    )) as ResultInterface;
    console.log(result);

    expect(result.status).toEqual(204);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: article_id }),
    )) as ResultInterface;
    console.log(result);

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: article_id }),
    )) as ResultInterface;
    console.log(result);

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.updateStatus({
        id: store_id,
        status: StoreStatusEnum.DELETED,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Store ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.remove({ id: store_id }),
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
      mediaController.remove({ id: cover_id }),
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
