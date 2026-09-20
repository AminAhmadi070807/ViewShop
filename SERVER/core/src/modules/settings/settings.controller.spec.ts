import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { AppModule } from '../../app.module';

describe('Test ( Setting ) Controller', () => {
  let module: TestingModule;
  let controller: SettingsController;

  const data = {
    social_media: {
      eitaa: 'https://www.facebook.com',
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.facebook.com',
      rubika: 'https://www.facebook.com',
      telegram: 'https://www.facebook.com',
      twitter: 'https://www.facebook.com',
      whatsApp: 'https://www.facebook.com',
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
    links: {
      bazaar: 'https://viewshop.com',
      direct: 'https://viewshop.com',
      myket: 'https://viewshop.com',
      sibApp: 'https://viewshop.com',
    },
    logo: {
      logo: crypto.randomUUID(),
      favicon: crypto.randomUUID(),
      night_model: crypto.randomUUID(),
      watermark: crypto.randomUUID(),
    },
    repair: { status: false, title: 'درست غلط در کار است' },
    scripts: {
      enamad: 'https://viewshop.com',
      organization: 'https://viewshop.com',
      union: 'https://viewshop.com',
    },
    support: {
      cell_phone: '09999999999',
      instagram: 'https://viewshop.com',
      telegram: 'https://viewshop.com',
      whatsApp: 'https://viewshop.com',
      status: false,
    },
  };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SettingsController>(SettingsController);
  });

  afterAll(async () => {
    await controller.empty();
    await module.close();
  });

  it('Test ( Set ) Controller', async () => {
    const result = await controller.setting(data);

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });
});
