import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { LikeService } from './like.service';

describe('Test ( Like ) Service', () => {
  let module: TestingModule;
  let service: LikeService;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<LikeService>(LikeService);
  });

  afterAll(async () => {
    await service.toggle({ product, user });
    await module.close();
  });

  it('Test ( Toggle ) Feature', async () => {
    const result = await service.toggle({ product, user });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
