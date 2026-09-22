import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { BrandsService } from './brands.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { MediaService } from '../media/media.service';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { randomInt } from 'crypto';

describe('Test ( Brands ) Controller', () => {
  let module: TestingModule;
  let service: BrandsService;
  let mediaService: MediaService;

  let brand_id: string;
  let logo_id: string;

  const title: string = `Unit Service ${randomInt(100, 10000)} Testing`;
  const description: string =
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';
  const alias: string = `unit-service-${randomInt(100, 10000)}-test`;
  const link: string = 'https://sabzlearn.ir';

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<BrandsService>(BrandsService);
    mediaService = module.get<MediaService>(MediaService);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await service.remove(brand_id);
    await mediaService.remove(logo_id);
    await module.close();
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaService.create({
      title,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    logo_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(brand_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
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

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(brand_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaService.remove(logo_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
