import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { MediaService } from './media.service';

describe('Test ( Media ) Service', () => {
  let module: TestingModule;
  let service: MediaService;

  let media_id: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const path: string = '/media/controller/test.png';
  const title: string = 'Unit Test';
  const type: MediaTypeEnum = MediaTypeEnum.PUBLIC;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<MediaService>(MediaService);
  });

  afterAll(async () => {
    await service.remove(media_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ path, user, title, type });

    media_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( Search ) Feature', async () => {
    const result = await service.search(title);

    expect(result.status).toEqual(200);
  });
});
