import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ArticlesController } from './articles.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import {
  ArticleStatusEnum,
  UpdateArticleStatusEnum,
} from '../../common/enums/articles/articles.status';
import { StoreController } from '../store/store.controller';
import { UsersController } from '../users/users.controller';
import { CategoriesController } from '../categories/category/categories.controller';
import { MediaController } from '../media/media.controller';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';

describe('Test ( Article ) Controller', () => {
  let module: TestingModule;
  let controller: ArticlesController;
  let usersController: UsersController;
  let categoryController: CategoriesController;
  let storeController: StoreController;
  let mediaController: MediaController;

  let article_id: string;
  let store_id: string;
  let author_id: string;
  let category_id: string;
  let cover_id: string;

  const title: string = 'Unit Controller Test Article';
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const slug = ['test', 'unit test', 'test for unit'];
  const shortDescription: string =
    ' راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    storeController = module.get<StoreController>(StoreController);
    usersController = module.get<UsersController>(UsersController);
    categoryController = module.get<CategoriesController>(CategoriesController);
    mediaController = module.get<MediaController>(MediaController);
  });

  afterAll(async () => {
    await controller.remove({ id: article_id, user: author_id });
    await storeController.remove({ id: store_id });
    await categoryController.remove({ id: category_id });
    await mediaController.remove({ id: cover_id });
    await usersController.remove({ id: article_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersController.create({
      phone: '09141234567',
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    author_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaController.create({
      title,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    cover_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const result = await categoryController.create({
      user: author_id,
      title,
      icon: cover_id,
      alias: crypto.randomUUID(),
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Store ) Controller', async () => {
    const result = await storeController.create({
      categories: [category_id],
      title,
      description,
      logo: cover_id,
      cell_phone: '09141236520',
    });

    if (result instanceof CustomException) throw result;

    store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      store: store_id,
      title,
      description,
      author: author_id,
      slug,
      category: category_id,
      cover: cover_id,
      shortDescription,
    });

    if (result instanceof CustomException) throw result;

    article_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({ page: 1 });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: article_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: article_id,
      slug,
      category: category_id,
      cover: cover_id,
      author: author_id,
      description,
      title,
      shortDescription,
      status: UpdateArticleStatusEnum.CONPLETION,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( UpdateStatus ) Controller', async () => {
    const result = await controller.updateStatus({
      id: article_id,
      status: ArticleStatusEnum.PUBLISHED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.updateStatus({
      id: article_id,
      status: ArticleStatusEnum.PUBLISHED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = await usersController.remove({
      id: author_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaController.remove({
      id: cover_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Controller', async () => {
    const result = await categoryController.remove({
      id: category_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Store ) Controller', async () => {
    const result = await storeController.remove({
      id: store_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
