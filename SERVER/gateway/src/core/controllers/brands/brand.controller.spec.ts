import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { BrandController } from './brand.controller';

describe('Test ( Brand ) Controller', () => {
  let module: TestingModule;
  let controller: BrandController;

  let brand_id: string;

  const logo: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const title: string = 'Unit Testing';
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const alias: string = 'unit-test';
  const link: string = 'https://sabzlearn.ir';

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const req = { user: { userId: user_id, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<BrandController>(BrandController);
  });

  afterAll(async () => {
    controller.remove({ id: brand_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ description, title, link, alias, logo }),
    )) as ResultInterface;

    if (result.status === 201) brand_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
