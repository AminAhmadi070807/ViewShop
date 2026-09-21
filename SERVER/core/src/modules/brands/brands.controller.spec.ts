import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { BrandsController } from './brands.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { MediaController } from '../media/media.controller';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';

describe('Test ( Brands ) Controller', () => {
  let module: TestingModule;
  let controller: BrandsController;
  let mediaController: MediaController;

  let brand_id: string;
  let logo_id: string;

  const title: string = 'Unit Testing';
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const alias: string = 'unit-test';
  const link: string = 'https://sabzlearn.ir';

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<BrandsController>(BrandsController);
    mediaController = module.get<MediaController>(MediaController);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await controller.remove({ id: brand_id });
    await mediaController.remove({ id: logo_id });
    await module.close();
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaController.create({
      title,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    logo_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      logo: logo_id,
      title,
      description,
      alias,
      link,
    });

    if (result instanceof CustomException) throw result;

    brand_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({ page: 1 });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: brand_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: brand_id,
      logo: logo_id,
      title,
      alias,
      link,
      description,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: brand_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
