import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { WishlistController } from './wishlist.controller';

describe('Test ( Wishlist ) Controller', () => {
  let module: TestingModule;
  let controller: WishlistController;

  const user = '70ffcfcf-baab-4937-8269-2d80574dab56';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<WishlistController>(WishlistController);
  });

  afterAll(async () => {
    await module.close();
  });
});
