import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { NewsletterController } from './newsletter.controller';
import { randomInt } from 'crypto';

describe('Test ( NewsLetter ) Controller', () => {
  let module: TestingModule;
  let controller: NewsletterController;

  let newsletter_id: string;

  const email: string = `viewshop_${randomInt(1000, 1_000_000)}@gmail.com`;

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

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: newsletter_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
