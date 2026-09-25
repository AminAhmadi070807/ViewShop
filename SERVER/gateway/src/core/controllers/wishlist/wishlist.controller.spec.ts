import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ProductStatusEnum } from '../../../common/enums/products/status.enum';
import { randomInt } from 'node:crypto';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';
import { StoreStatusEnum } from '../../../common/enums/store/store.status';
import { UsersController } from '../users/user.controller';
import { ColorController } from '../colors/color.controller';
import { BrandController } from '../brands/brand.controller';
import { SpecificationController } from '../specification/specification.controller';
import { MediaController } from '../uploads/media.controller';
import { StoreController } from '../store/store.controller';
import { CategoryController } from '../categories/category/category.controller';
import { ProductController } from '../products/product.controller';
import { WishlistController } from './wishlist.controller';

describe('Test ( Wishlist ) Controller', () => {
  let module: TestingModule;
  let controller: WishlistController;
  let productController: ProductController;
  let usersController: UsersController;
  let colorController: ColorController;
  let brandController: BrandController;
  let specificationController: SpecificationController;
  let mediaController: MediaController;
  let storeController: StoreController;
  let categoryController: CategoryController;

  let wishlist_id: string;
  let user_id: string;
  let color_id: string;
  let product_id: string;
  let brand_id: string;
  let specification_id: string;
  let store_id: string;
  let category_id: string;

  const title = `unit ${crypto.randomUUID()} product`;
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labus sit amet est placer in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.'`;
  const discount_percent = 0;
  const details: {
    id: string;
    color: string;
    price: number;
    stock: number;
  }[] = [];
  const medias: string[] = [];
  const alias: string = `unit-controller-${crypto.randomUUID()}-test-product`;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<WishlistController>(WishlistController);
    productController = module.get<ProductController>(ProductController);
    usersController = module.get<UsersController>(UsersController);
    colorController = module.get<ColorController>(ColorController);
    brandController = module.get<BrandController>(BrandController);
    specificationController = module.get<SpecificationController>(
      SpecificationController,
    );
    mediaController = module.get<MediaController>(MediaController);
    storeController = module.get<StoreController>(StoreController);
    categoryController = module.get<CategoryController>(CategoryController);
  });

  afterAll(async () => {
    controller.remove({ id: wishlist_id });
    productController.remove({ id: product_id });
    storeController.remove({ id: store_id });
    categoryController.remove({ id: category_id });
    mediaController.remove({ id: medias[0] });
    colorController.remove({ id: color_id });
    brandController.remove({ id: brand_id });
    specificationController.remove({ id: specification_id });
    usersController.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.create({
        fullName: 'کاربر تستی',
        password: '00000000',
        phone: `0914${randomInt(1_000_000, 9_999_999)}`,
      }),
    )) as ResultInterface;

    if (result.status === 201) user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const file: Express.Multer.File = {
      fieldname: 'file',
      originalname: `${crypto.randomUUID()}.jpg`,
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 1024,
      destination: '/tmp',
      filename: `${crypto.randomUUID()}.jpg`,
      path: `/tmp/${crypto.randomUUID()}.jpg`,
      buffer: Buffer.from('fake image content'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      stream: null as any,
    };

    const result = (await firstValueFrom(
      mediaController.upload(
        file,
        {
          title: crypto.randomUUID(),
          type: MediaTypeEnum.PUBLIC,
          media: crypto.randomUUID(),
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 200) medias.push(result.body.id);

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      categoryController.create(
        {
          icon: medias[0],
          title: crypto.randomUUID(),
          alias: crypto.randomUUID(),
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Store ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.create({
        title,
        logo: medias[0],
        cell_phone: `0914${randomInt(1000000, 9999999)}`,
        categories: [category_id],
        description,
      }),
    )) as ResultInterface;

    if (result.status === 201) store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.updateStatus({
        id: store_id,
        status: StoreStatusEnum.PENDING,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create Color ) Controller', async () => {
    const result = (await firstValueFrom(
      colorController.create({
        color: `#245${randomInt(100, 999)}`,
        title: `شنانپونزه ای تیره ${randomInt(100, 999)}`,
      }),
    )) as ResultInterface;

    if (result.status === 201) color_id = result.body.id;

    details.push({
      id: crypto.randomUUID(),
      color: color_id,
      price: 100000000,
      stock: 1000,
    });

    expect(result.status).toBe(201);
  });

  it('Test ( Create Brand ) Controller', async () => {
    const result = (await firstValueFrom(
      brandController.create({
        description,
        title: `${randomInt(1000, 100000)}`,
        link: 'https://sabzlearn.ir',
        alias: `${randomInt(1000, 100000)}`,
        logo: medias[0],
      }),
    )) as ResultInterface;

    if (result.status === 201) brand_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Specification ) Controller', async () => {
    const details = [
      {
        title: crypto.randomUUID(),
        details: [{ title: crypto.randomUUID(), value: crypto.randomUUID() }],
      },
    ];

    const result = (await firstValueFrom(
      specificationController.create({ title, details }),
    )) as ResultInterface;

    if (result.status === 201) specification_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Product ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      productController.create(
        {
          description: description + crypto.randomUUID(),
          alias,
          medias,
          details,
          discount_percent,
          specification: specification_id,
          store: store_id,
          brand: brand_id,
          title,
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) product_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.create(
        {
          title: crypto.randomUUID(),
          product: product_id,
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) wishlist_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: wishlist_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: wishlist_id, title: crypto.randomUUID() }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: wishlist_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Product ) Controller', async () => {
    const result = (await firstValueFrom(
      productController.remove({ id: product_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Store Status ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.updateStatus({
        id: store_id,
        status: StoreStatusEnum.DELETED,
      }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Store ) Controller', async () => {
    const result = (await firstValueFrom(
      storeController.remove({ id: store_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Controller', async () => {
    const result = (await firstValueFrom(
      categoryController.remove({ id: category_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Brand ) Controller', async () => {
    const result = (await firstValueFrom(
      brandController.remove({ id: brand_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = (await firstValueFrom(
      mediaController.remove({ id: medias[0] }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Color ) Controller', async () => {
    const result = (await firstValueFrom(
      colorController.remove({ id: color_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Specification ) Controller', async () => {
    const result = (await firstValueFrom(
      specificationController.remove({ id: specification_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.remove({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
