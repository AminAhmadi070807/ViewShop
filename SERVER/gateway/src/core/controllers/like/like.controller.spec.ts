import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { LikeController } from './like.controller';

describe('Test ( Like ) Controller', () => {
  let module: TestingModule;
  let controller: LikeController;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  afterAll(async () => {
    controller.toggle({ product }, req);
    await module.close();
  });

  it('Test ( Toggle ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.toggle({ product }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });
});
