import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MediaController } from './media.controller';

describe('Test ( Like ) Controller', () => {
  let module: TestingModule;
  let controller: MediaController;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MediaController>(MediaController);
  });

  afterAll(async () => {
    await module.close();
  });
});
