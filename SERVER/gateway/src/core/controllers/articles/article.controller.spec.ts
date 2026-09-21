import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ArticleController } from './article.controller';
import {
  ArticleStatusEnum,
  UpdateArticleStatusEnum,
} from '../../../common/enums/articles/articles.enum';

describe('Test ( Article ) Controller', () => {
  let module: TestingModule;
  let controller: ArticleController;

  let article_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const title: string = 'Unit Test Article';
  const store: string = 'b5a11a85-f5d8-430b-be0f-c8892656dbba';
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const slug = ['test', 'unit test', 'test unit'];
  const category: string = 'bd015464-eb0e-46c1-b5fe-bfbb4a2ea674';
  const cover: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const shortDescription: string =
    ' راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد';

  const req = { user: { userId: user_id, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  afterAll(async () => {
    controller.remove({ id: article_id }, req);
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
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
