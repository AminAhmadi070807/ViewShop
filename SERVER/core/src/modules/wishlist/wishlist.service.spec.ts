import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
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
});
