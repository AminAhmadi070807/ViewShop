import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MediaController } from './media.controller';
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
});
