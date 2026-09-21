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

  let user_id: string;
  let product_id: string;
  let product_detail_id: string;
  let color_id: string;
  let brand_id: string;
  let specification_id: string;
  let store_id: string;

  const title = 'unit test product';
  const description =
    'unit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit testunit test product description this description for was unit test';
  const discount_percent = 0;
  const details = [
    {
      id: crypto.randomUUID(),
      color: 'f48533d3-cc90-4d78-b9ec-b85bfb261e53',
      price: 100000000,
      stock: 1000,
    },
  ];
  const medias: string[] = [];
  const alias: string = 'unit-controller-test-product';

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
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersController.create({
      phone: '09141234567',
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaController.create({
      title,
      user: user_id,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    medias.push(result.body.id);

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Color ) Controller', async () => {
    const result = await colorController.create({
      color: '#2456ae',
      title: 'شنانپونزه ای تیره',
    });

    if (result instanceof CustomException) throw result;

    color_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( Create Brand ) Controller', async () => {
    const result = await brandController.create({
      logo: medias[0],
      title,
      description,
      alias,
      link: 'https://sabzlearn.ir',
    });

    if (result instanceof CustomException) throw result;

    brand_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Product ) Controller', async () => {
    const result = await productController.create({
      title,
      description,
      brand: brand_id,
      userId: user_id,
      store: store_id,
      specification: specification_id,
      discount_percent,
      details,
      medias,
      alias,
    });

    if (result instanceof CustomException) throw result;

    product_id = result.body.id;

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
});
