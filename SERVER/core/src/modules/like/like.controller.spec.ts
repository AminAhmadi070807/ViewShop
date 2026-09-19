import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { LikeController } from './like.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Like ) Controller', () => {
  let module: TestingModule;
  let controller: LikeController;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  afterAll(async () => {
    await controller.toggle({ product, user });
    await module.close();
  });

  it('Test ( Toggle ) Controller', async () => {
    const result = await controller.toggle({ product, user });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });
});
