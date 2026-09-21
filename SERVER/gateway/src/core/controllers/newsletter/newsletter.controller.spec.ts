import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { NewsletterController } from './newsletter.controller';

describe('Test ( NewsLetter ) Controller', () => {
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
    controller.remove({ id: newsletter_id });
    await module.close();
  });
});
