import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { WishlistController } from './wishlist.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Wishlist ) Controller', () => {
  let module: TestingModule;
  let controller: WishlistController;

  let wishlist_id: string;

  const user = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const title: string = 'unit test';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<WishlistController>(WishlistController);
  });

  afterAll(async () => {
    await controller.remove({ id: wishlist_id });
    await module.close();
  });

  it('Test ( Create )', async () => {
    const result = await controller.create({ user, product, title });

    if (result instanceof CustomException) throw result;

    wishlist_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll )', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne )', async () => {
    const result = await controller.findOne({ id: wishlist_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update )', async () => {
    const result = await controller.update({ id: wishlist_id, title });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete )', async () => {
    const result = await controller.update({ id: wishlist_id, title });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
