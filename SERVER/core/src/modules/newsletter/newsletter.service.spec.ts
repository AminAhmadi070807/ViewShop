import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { NewsletterService } from './newsletter.service';
import { randomInt } from 'crypto';

describe('Test ( NewsLetter ) Service', () => {
  let module: TestingModule;
  let service: NewsletterService;

  let newsletter_id: string;

  const email: string = `viewshop${randomInt(10000, 1000000)}@gmail.com`;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<NewsletterService>(NewsletterService);
  });

  afterAll(async () => {
    await service.remove(newsletter_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ email });

    if (result instanceof CustomException) throw result;

    newsletter_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(newsletter_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
