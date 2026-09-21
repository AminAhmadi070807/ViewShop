import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import {
  ArticleStatusEnum,
  UpdateArticleStatusEnum,
} from '../../common/enums/articles/articles.status';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { ArticlesService } from './articles.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/category/categories.service';
import { StoreService } from '../store/store.service';
import { MediaService } from '../media/media.service';

describe('Test ( Article ) Service', () => {
  let module: TestingModule;
  let service: ArticlesService;
  let usersService: UsersService;
  let categoryService: CategoriesService;
  let storeService: StoreService;
  let mediaService: MediaService;

  let article_id: string;
  let store_id: string;
  let author_id: string;
  let category_id: string;
  let cover_id: string;

  const title: string = 'Unit Service Test Article';
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const slug = ['test', 'unit test', 'test for unit'];
  const shortDescription: string =
    ' راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    storeService = module.get<StoreService>(StoreService);
    usersService = module.get<UsersService>(UsersService);
    categoryService = module.get<CategoriesService>(CategoriesService);
    mediaService = module.get<MediaService>(MediaService);
  });

  afterAll(async () => {
    await service.remove(article_id);
    await storeService.remove(store_id);
    await categoryService.remove(category_id);
    await mediaService.remove(cover_id);
    await usersService.remove({ id: author_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersService.create({
      phone: '09141234567',
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    author_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Feature', async () => {
    const result = await mediaService.create({
      title,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    cover_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Feature', async () => {
    const result = await categoryService.create({
      title,
      user: author_id,
      icon: cover_id,
      alias: crypto.randomUUID(),
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Store ) Feature', async () => {
    const result = await storeService.create({
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

  it('Test ( Update Store Status ) Feature', async () => {
    const result = await storeService.updateStatus({
      id: store_id,
      status: StoreStatusEnum.PENDING,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(article_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
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

  it('Test ( UpdateStatus ) Feature', async () => {
    const result = await service.updateStatus({
      id: article_id,
      status: ArticleStatusEnum.PUBLISHED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(article_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Store Status ) Feature', async () => {
    const result = await storeService.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Store ) Feature', async () => {
    const result = await storeService.remove(store_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Feature', async () => {
    const result = await categoryService.remove(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Feature', async () => {
    const result = await mediaService.remove(cover_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Feature', async () => {
    const result = await usersService.remove({
      id: author_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
