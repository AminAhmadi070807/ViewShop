import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SettingsService } from './settings.service';

describe('Test ( Setting ) Service', () => {
  let module: TestingModule;
  let service: SettingsService;

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

    service = module.get<SettingsService>(SettingsService);
  });

  afterAll(async () => {
    await service.empty();
    await module.close();
  });

  it('Test ( Set ) Feature', async () => {
    const result = await service.setting(data);

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( Empty ) Feature', async () => {
    const result = await service.empty();

    expect(result.status).toEqual(204);
  });
});
