import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterController } from './newsletter.controller';
import { AppModule } from '../../app.module';

describe('Test ( NewsLetter ) Controller', () => {
  let module: TestingModule;
  let controller: NewsletterController;

  let newsletter_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<NewsletterController>(NewsletterController);
  });

  afterAll(async () => {
    await controller.remove({ id: newsletter_id });
    await module.close();
  });
});
