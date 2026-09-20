import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { StoryService } from './story.service';

describe('Test ( Story ) Service', () => {
  let module: TestingModule;
  let service: StoryService;

  let story_id: string;

  const title = 'unit test';
  const user = '1c4b85ac-f889-4396-a98c-803e531037af';
  const product = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const banner = '8c97defa-1de2-4b30-b716-d63feeac003a';
  const video = '5372b37e-7d4b-4b40-b16a-b53b4836bb00';
  const category = 'bd015464-eb0e-46c1-b5fe-bfbb4a2ea674';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<StoryService>(StoryService);
  });

  afterAll(async () => {
    await service.remove(story_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      title,
      user,
      product,
      banner,
      video,
      category,
    });

    if (result instanceof CustomException) throw result;

    story_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
