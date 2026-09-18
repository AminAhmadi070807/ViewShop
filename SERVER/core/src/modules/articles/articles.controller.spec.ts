import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ArticlesController } from './articles.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Addresses ) Controller', () => {
  let controller: ArticlesController;
  let module: TestingModule;

  let article_id: string;

  const title: string = 'Unit Test Article';
  const store: string = 'b5a11a85-f5d8-430b-be0f-c8892656dbba';
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const author_id: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const slug = ['test', 'unit test', 'test for unit'];
  const category_id: string = 'bd015464-eb0e-46c1-b5fe-bfbb4a2ea674';
  const cover: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const shortDescription: string =
    ' راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  afterAll(async () => {
    await controller.remove({ id: article_id, user: author_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      store,
      title,
      description,
      author: author_id,
      slug,
      category: category_id,
      cover,
      shortDescription,
    });

    if (result instanceof CustomException) throw result;

    article_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({ page: 1 });

    expect(result.status).toBe(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: article_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(200);
  });
});
