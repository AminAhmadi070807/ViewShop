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

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ email }),
    )) as ResultInterface;

    if (result.status === 201) newsletter_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
