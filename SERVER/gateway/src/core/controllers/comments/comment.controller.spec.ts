import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { CommentController } from './comment.controller';
import { UsersController } from '../users/user.controller';
import { ColorController } from '../colors/color.controller';
import { ProductController } from '../products/product.controller';
import { BrandController } from '../brands/brand.controller';
import { SpecificationController } from '../specification/specification.controller';
import { MediaController } from '../uploads/media.controller';
import { StoreController } from '../store/store.controller';
import { CategoryController } from '../categories/category/category.controller';
import { randomInt } from 'node:crypto';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';
import { StoreStatusEnum } from '../../../common/enums/store/store.status';

describe('Test ( Comment ) Controller', () => {
  let module: TestingModule;
  let controller: CommentController;
  let usersController: UsersController;
  let colorController: ColorController;
  let productController: ProductController;
  let brandController: BrandController;
  let specificationController: SpecificationController;
  let mediaController: MediaController;
  let storeController: StoreController;
  let categoryController: CategoryController;

  let comment_id: string;
  let child_comment_id: string;
  let user_id: string;
  let color_id: string;
  let product_id: string;
  let brand_id: string;
  let specification_id: string;
  let store_id: string;
  let category_id: string;

  const description: string = crypto.randomUUID();
  const score: number = 5;

  const title = `unit ${crypto.randomUUID()} product`;
  const description_product = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labus sit amet est placer in egestas erat. Nisi vitae suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet.'`;
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

    controller = module.get<CommentController>(CommentController);
    usersController = module.get<UsersController>(UsersController);
    colorController = module.get<ColorController>(ColorController);
    productController = module.get<ProductController>(ProductController);
    brandController = module.get<BrandController>(BrandController);
    specificationController = module.get<SpecificationController>(
      SpecificationController,
    );
    mediaController = module.get<MediaController>(MediaController);
    storeController = module.get<StoreController>(StoreController);
    categoryController = module.get<CategoryController>(CategoryController);
  });

  afterAll(async () => {
    controller.remove({ id: comment_id });
    controller.remove({ id: child_comment_id });
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
        description: description_product,
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
          title,
          description: description_product + crypto.randomUUID(),
          brand: brand_id,
          store: store_id,
          specification: specification_id,
          discount_percent,
          details,
          medias,
          alias,
        },
        req,
      ),
    )) as ResultInterface;

    product_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.create({ product: product_id, score, description }, req),
    )) as ResultInterface;

    if (result.status === 201) comment_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Find Product Comment ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findProductComments({ id: product_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: comment_id, status: true }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create Child Comment ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.create(
        { product: product_id, score, description, parentComment: comment_id },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) child_comment_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Update Child Comment ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.update({ id: child_comment_id, status: true }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Child Comment ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: child_comment_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: comment_id }),
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
