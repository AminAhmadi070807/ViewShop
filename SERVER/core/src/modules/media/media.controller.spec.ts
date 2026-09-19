import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MediaController } from './media.controller';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';

describe('Test ( Like ) Controller', () => {
  let module: TestingModule;
  let controller: MediaController;

  let media_id: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const path: string = '/media/controller/test.png';
  const title: string = 'Unit Test';
  const type: MediaTypeEnum = MediaTypeEnum.PUBLIC;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MediaController>(MediaController);
  });

  afterAll(async () => {
    await controller.remove({ id: media_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ path, user, title, type });

    media_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });
});
