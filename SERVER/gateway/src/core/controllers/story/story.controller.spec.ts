import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { StoryController } from './story.controller';

describe('Test ( Story ) Controller', () => {
  let module: TestingModule;
  let controller: StoryController;

  let story_id: string;

  const title: string = 'Unit Test';
  const description: string =
    'unit test store description about unit test category and products';
  const logo: string = '45c10326-79e9-453f-9890-e725a95ef4f8';
  const cell_phone = '09999999999';
  const categories = ['bd015464-eb0e-46c1-b5fe-bfbb4a2ea674'];

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<StoryController>(StoryController);
  });

  afterAll(async () => {
    controller.remove({ id: story_id });
    await module.close();
  });
});
