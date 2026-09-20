import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { WishlistService } from './wishlist.service';

describe('Test ( Wishlist ) Service', () => {
  let module: TestingModule;
  let service: WishlistService;

  let wishlist_id: string;

  const user = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const title: string = 'unit test';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  afterAll(async () => {
    await service.remove({ id: wishlist_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ user, product, title });

    if (result instanceof CustomException) throw result;

    wishlist_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne({ id: wishlist_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
