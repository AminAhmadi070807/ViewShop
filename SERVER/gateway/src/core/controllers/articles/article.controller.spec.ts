import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ArticleController } from './article.controller';

describe('Test ( Article ) Controller', () => {
  let module: TestingModule;
  let controller: ArticleController;

  let article_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const req = { user: { userId: user_id, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  afterAll(async () => {
    controller.remove({ id: article_id }, req);
    await module.close();
  });
});
