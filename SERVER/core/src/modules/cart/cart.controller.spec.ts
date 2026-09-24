import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { UsersController } from '../users/users.controller';
import { ColorsController } from '../colors/colors.controller';
import { ProductController } from '../products/product.controller';
import { BrandsController } from '../brands/brands.controller';
import { SpecificationController } from '../specification/specification.controller';
import { MediaController } from '../media/media.controller';
import { StoreController } from '../store/store.controller';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { CategoriesController } from '../categories/category/categories.controller';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { randomInt } from 'node:crypto';

describe('Test ( Cart ) Controller', () => {
  let module: TestingModule;
  let controller: CartController;
  let usersController: UsersController;
  let colorController: ColorsController;
  let productController: ProductController;
  let brandController: BrandsController;
  let specificationController: SpecificationController;
  let mediaController: MediaController;
  let storeController: StoreController;
  let categoryController: CategoriesController;

  let user_id: string;
  let product_id: string;
  let product_detail_id: string;
  let color_id: string;
  let brand_id: string;
  let specification_id: string;
  let store_id: string;
  let category_id: string;

  const title = `unit ${crypto.randomUUID()} product`;
  const description =
    'unit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit test';
  const discount_percent = 0;
  const details: {
    id: string;
    color: string;
    price: number;
    stock: number;
  }[] = [];
  const medias: string[] = [];
  const alias: string = `unit-controller-${crypto.randomUUID()}-test-product`;

  const quantity: number = 1;

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<CartController>(CartController);
    usersController = module.get<UsersController>(UsersController);
    colorController = module.get<ColorsController>(ColorsController);
    productController = module.get<ProductController>(ProductController);

    brandController = module.get<BrandsController>(BrandsController);
    specificationController = module.get<SpecificationController>(
      SpecificationController,
    );
    mediaController = module.get<MediaController>(MediaController);
    storeController = module.get<StoreController>(StoreController);
    categoryController = module.get<CategoriesController>(CategoriesController);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await controller.remove({ id: user_id, user: user_id });
    await productController.remove({ id: product_id, user: user_id });
    await storeController.remove({ id: store_id });
    await categoryController.remove({ id: category_id });
    await mediaController.remove({ id: medias[0] });
    await colorController.remove({ id: color_id });
    await brandController.remove({ id: brand_id });
    await specificationController.remove({ id: specification_id });
    await usersController.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersController.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaController.create({
      title: crypto.randomUUID(),
      user: user_id,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    medias.push(result.body.id);

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const result = await categoryController.create({
      title: crypto.randomUUID(),
      user: user_id,
      icon: medias[0],
      alias: crypto.randomUUID(),
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Store ) Controller', async () => {
    const result = await storeController.create({
      categories: [category_id],
      title: crypto.randomUUID(),
      description,
      logo: medias[0],
      cell_phone: `0914${randomInt(1000000, 9999999)}`,
    });

    if (result instanceof CustomException) throw result;

    store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = await storeController.updateStatus({
      id: store_id,
      status: StoreStatusEnum.PENDING,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create Color ) Controller', async () => {
    const result = await colorController.create({
      color: `#245${randomInt(100, 999)}`,
      title: `شنانپونزه ای تیره ${randomInt(100, 999)}`,
    });

    if (result instanceof CustomException) throw result;

    color_id = result.body.id;

    details.push({
      id: crypto.randomUUID(),
      color: color_id,
      price: 100000000,
      stock: 1000,
    });

    expect(result.status).toBe(201);
  });

  it('Test ( Create Brand ) Controller', async () => {
    const result = await brandController.create({
      logo: medias[0],
      title: crypto.randomUUID(),
      description,
      alias: crypto.randomUUID(),
      link: 'https://sabzlearn.ir',
    });

    if (result instanceof CustomException) throw result;

    brand_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Specification ) Controller', async () => {
    const result = await specificationController.create({
      title: crypto.randomUUID(),
      details: [
        {
          title: crypto.randomUUID(),
          details: [{ title: crypto.randomUUID(), value: crypto.randomUUID() }],
        },
      ],
    });

    specification_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Product ) Controller', async () => {
    const result = await productController.create({
      title: crypto.randomUUID(),
      description,
      brand: brand_id,
      userId: user_id,
      store: store_id,
      specification: specification_id,
      discount_percent,
      details,
      medias,
      alias: crypto.randomUUID(),
    });

    if (result instanceof CustomException) throw result;

    product_id = result.body.id;
    product_detail_id = result.body.productDetailsId[0];

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      user: user_id,
      quantity,
      product: product_id,
      product_detail_id,
      color: color_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({
      id: user_id,
      user: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Product ) Controller', async () => {
    const result = await productController.remove({ id: product_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = await storeController.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Store ) Controller', async () => {
    const result = await storeController.remove({
      id: store_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Controller', async () => {
    const result = await categoryController.remove({
      id: category_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Brand ) Controller', async () => {
    const result = await brandController.remove({ id: brand_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaController.remove({
      id: medias[0],
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Color ) Controller', async () => {
    const result = await colorController.remove({ id: color_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

  it('Test ( Delete Specification ) Controller', async () => {
    const result = await specificationController.remove({
      id: specification_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = await usersController.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
