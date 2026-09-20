import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { StoryController } from './story.controller';

describe('Test ( Story ) Controller', () => {
  let module: TestingModule;
  let controller: StoryController;

  let story_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<StoryController>(StoryController);
  });

  afterAll(async () => {
    await controller.remove({ id: story_id });
    await module.close();
  });
});
