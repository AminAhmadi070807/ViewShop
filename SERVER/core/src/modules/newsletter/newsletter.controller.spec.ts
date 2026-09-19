import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterController } from './newsletter.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

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
    await controller.remove({ id: newsletter_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ email });

    if (result instanceof CustomException) throw result;

    newsletter_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: newsletter_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
