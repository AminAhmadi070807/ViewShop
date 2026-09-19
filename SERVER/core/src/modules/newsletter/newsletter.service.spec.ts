import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterController } from './newsletter.controller';
import { AppModule } from '../../app.module';

describe('Test ( NewsLetter ) Service', () => {
  let module: TestingModule;
  let controller: NewsletterController;

  let newsletter_id: string;

  const email: string = 'viewshop@gmail.com';

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
