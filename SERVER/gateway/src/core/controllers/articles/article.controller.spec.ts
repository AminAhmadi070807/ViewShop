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

describe('Test ( Article ) Controller', () => {
  let module: TestingModule;
  let controller: ArticleController;
  let usersController: UsersController;
  let storeController: StoreController;
  let mediaController: MediaController;

  let article_id: string;

  let user_id: string;
  let category_id: string;
  let store_id: string;
  let cover_id: string;

  const title: string = `Unit ${crypto.randomUUID()} Article`;
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
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
  });

  afterAll(async () => {
    controller.remove({ id: article_id });
    usersController.remove({ id: article_id });
    storeController.remove({ id: article_id });
    mediaController.remove({ id: article_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.create({ fullName, password, phone }),
    )) as ResultInterface;

    if (result.status === 201) user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.create(
        { shortDescription, cover, description, title, store, category, slug },
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
          cover,
          category,
          status: UpdateArticleStatusEnum.CONPLETION,
        },
        req,
      ),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.updateStatus({
        id: article_id,
        status: ArticleStatusEnum.PUBLISHED,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: article_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: article_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
