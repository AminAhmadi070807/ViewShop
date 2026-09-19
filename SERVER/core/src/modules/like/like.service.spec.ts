import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { LikeService } from './like.service';

describe('Test ( Like ) Controller', () => {
  let module: TestingModule;
  let service: LikeService;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<LikeService>(LikeService);
  });

  afterAll(async () => {
    await service.toggle({ product, user });
    await module.close();
  });
});
