import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ArticlesController } from './articles.controller';

describe('Test ( Addresses ) Controller', () => {
  let controller: ArticlesController;
  let module: TestingModule;

  let article_id: string;

  const user_id: string = '70ffcfcf-baab-4937-8269-2d80574dab56';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  afterAll(async () => {
    await controller.remove({ id: article_id, user: user_id });
    await module.close();
  });
});
