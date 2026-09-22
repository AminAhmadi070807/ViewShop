import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { CartService } from './cart.service';
import { UsersService } from '../users/users.service';
import { ColorsService } from '../colors/colors.service';
import { ProductService } from '../products/product.service';
import { BrandsService } from '../brands/brands.service';
import { SpecificationService } from '../specification/specification.service';
import { MediaService } from '../media/media.service';
import { StoreService } from '../store/store.service';
import { CategoriesService } from '../categories/category/categories.service';
import { randomInt } from 'node:crypto';

describe('Test ( Cart ) Service', () => {
  let module: TestingModule;
  let service: CartService;
  let usersService: UsersService;
  let colorService: ColorsService;
  let productService: ProductService;
  let brandService: BrandsService;
  let specificationService: SpecificationService;
  let mediaService: MediaService;
  let storeService: StoreService;
  let categoryService: CategoriesService;

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
  const details = [
    {
      id: crypto.randomUUID(),
      color: 'f48533d3-cc90-4d78-b9ec-b85bfb261e53',
      price: 100000000,
      stock: 1000,
    },
  ];
  const medias: string[] = [];
  const alias: string = `unit-controller-${crypto.randomUUID()}-test-product`;

  const quantity: number = 1;

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<CartService>(CartService);
    usersService = module.get<UsersService>(UsersService);
    colorService = module.get<ColorsService>(ColorsService);
    productService = module.get<ProductService>(ProductService);
    brandService = module.get<BrandsService>(BrandsService);
    specificationService =
      module.get<SpecificationService>(SpecificationService);
    mediaService = module.get<MediaService>(MediaService);
    storeService = module.get<StoreService>(StoreService);
    categoryService = module.get<CategoriesService>(CategoriesService);
  });

  afterAll(async () => {
    await service.remove({ id: user_id, user: user_id });
    await storeService.remove(store_id);
    await categoryService.remove(category_id);
    await mediaService.remove(medias[0]);
    await colorService.remove(color_id);
    await brandService.remove(brand_id);
    await specificationService.remove(specification_id);
    await usersService.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersService.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const result = await mediaService.create({
      title,
      user: user_id,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    medias.push(result.body.id);

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const result = await categoryService.create({
      title,
      user: user_id,
      icon: medias[0],
      alias: crypto.randomUUID(),
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Store ) Controller', async () => {
    const result = await storeService.create({
      categories: [category_id],
      title,
      description,
      logo: medias[0],
      cell_phone: '09141236520',
    });

    if (result instanceof CustomException) throw result;

    store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = await storeService.updateStatus({
      id: store_id,
      status: StoreStatusEnum.PENDING,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create Color ) Controller', async () => {
    const result = await colorService.create({
      color: '#2456ae',
      title: 'شنانپونزه ای تیره',
    });

    if (result instanceof CustomException) throw result;

    color_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( Create Brand ) Controller', async () => {
    const result = await brandService.create({
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

  it('Test ( Create Specification ) Controller', async () => {
    const result = await specificationService.create({
      title,
      details: [
        {
          title: 'unit test 1',
          details: [{ title: 'unit test', value: 'unit test' }],
        },
      ],
    });

    specification_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Product ) Controller', async () => {
    const result = await productService.create({
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
    product_detail_id = result.body.productDetailsId[0];

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await service.create({
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
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await service.findOne({ id: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await service.remove({
      id: user_id,
      user: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Product ) Controller', async () => {
    const result = await productService.remove(product_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = await storeService.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Store ) Controller', async () => {
    const result = await storeService.remove(store_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Controller', async () => {
    const result = await categoryService.remove(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Brand ) Controller', async () => {
    const result = await brandService.remove(brand_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaService.remove(medias[0]);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Color ) Controller', async () => {
    const result = await colorService.remove(color_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

  it('Test ( Delete Specification ) Controller', async () => {
    const result = await specificationService.remove(specification_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = await usersService.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
