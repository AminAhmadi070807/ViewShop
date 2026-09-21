import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { SettingController } from './setting.controller';

describe('Test ( Setting ) Controller', () => {
  let module: TestingModule;
  let controller: SettingController;

  const data = {
    information: {
      title: 'ویوشاپ',
      cell_phone: '09999999999',
      full_title: 'بزرگترین فروشگاه ایران ویویشاپ',
      service_hours: '0-24',
      description: 'این یک توضیح ساده از طرف ویوشاپ تست میباشد',
      email: 'viewshop.email@gmail.com',
    },
    journal: {
      description: 'ویوشاپ مجله بهترین مجله های ایران هست',
      title: 'ویو شاپ مجله',
    },
    address: {
      full_address: 'خوی 45 متری سیستانی زاده',
      city: 'خوی',
      location: {
        Latitude: '38.5639337851603',
        Longitude: '44.95256312188834',
      },
      province: 'آذربیجان غربی',
      zip_code: '581965195',
    },
    scripts: {
      enamad: 'https://viewshop.com',
      organization: 'https://viewshop.com',
      union: 'https://viewshop.com',
    },
    social_media: {
      eitaa: 'https://www.facebook.com',
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.facebook.com',
      rubika: 'https://www.facebook.com',
      telegram: 'https://www.facebook.com',
      twitter: 'https://www.facebook.com',
      whatsApp: 'https://www.facebook.com',
    },
    link: {
      bazaar: 'https://viewshop.com',
      direct: 'https://viewshop.com',
      myket: 'https://viewshop.com',
      sibApp: 'https://viewshop.com',
    },
    support: {
      cell_phone: '09999999999',
      instagram: 'https://viewshop.com',
      telegram: 'https://viewshop.com',
      whatsApp: 'https://viewshop.com',
      status: false,
    },
    repair: { status: false, title: 'درست غلط در کار است' },
    logo: {
      logo: crypto.randomUUID(),
      favicon: crypto.randomUUID(),
      night_model: crypto.randomUUID(),
      watermark: crypto.randomUUID(),
    },
  };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SettingController>(SettingController);
  });

  afterAll(async () => {
    controller.empty();
    await module.close();
  });

  it('Test ( SETTING ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.setting(data),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Find ) Controller', async () => {
    const result = (await firstValueFrom(controller.find())) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Empty ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.empty(),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
