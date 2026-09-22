import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { randomInt } from 'node:crypto';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { StoreStatusEnum } from '../../common/enums/store/store.enum';
import { StoryStatusEnum } from '../../common/enums/story/status.enum';
import { StoryService } from './story.service';
import { UsersService } from '../users/users.service';
import { ColorsService } from '../colors/colors.service';
import { ProductService } from '../products/product.service';
import { BrandsService } from '../brands/brands.service';
import { SpecificationService } from '../specification/specification.service';
import { MediaService } from '../media/media.service';
import { StoreService } from '../store/store.service';
import { CategoriesService } from '../categories/category/categories.service';

describe('Test ( Story ) Feature', () => {
  let module: TestingModule;
  let service: StoryService;
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
  let color_id: string;
  let brand_id: string;
  let specification_id: string;
  let store_id: string;

  const title = `unit ${crypto.randomUUID()} test`;
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
  const alias: string = `unit-Service-${crypto.randomUUID()}-test-product`;

  let story_id: string;
  let banner_id: string;
  let video_id: string;
  let category_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<StoryService>(StoryService);
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
    await service.remove(story_id);
    await productService.remove(product_id);
    await storeService.remove(store_id);
    await categoryService.remove(category_id);
    await mediaService.remove(video_id);
    await colorService.remove(color_id);
    await brandService.remove(brand_id);
    await specificationService.remove(specification_id);
    await usersService.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create User ) Feature', async () => {
    const result = await usersService.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Media ) Feature', async () => {
    const result = await mediaService.create({
      title,
      user: user_id,
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    medias.push(result.body.id);
    banner_id = result.body.id;
    video_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create Category ) Feature', async () => {
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

  it('Test ( Create Store ) Feature', async () => {
    const result = await storeService.create({
      categories: [category_id],
      title,
      description,
      logo: medias[0],
      cell_phone: `0914${randomInt(1000000, 9999999)}`,
    });

    if (result instanceof CustomException) throw result;

    store_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Update Store Status ) Feature', async () => {
    const result = await storeService.updateStatus({
      id: store_id,
      status: StoreStatusEnum.PENDING,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create Color ) Feature', async () => {
    const result = await colorService.create({
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

  it('Test ( Create Brand ) Feature', async () => {
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

  it('Test ( Create Specification ) Feature', async () => {
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

  it('Test ( Create Product ) Feature', async () => {
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

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      title,
      user: user_id,
      product: product_id,
      banner: banner_id,
      video: video_id,
      category: category_id,
    });

    if (result instanceof CustomException) {
      const error: { message: string; status: number } = result.getError() as {
        message: string;
        status: number;
      };

      expect(error.status).toEqual(409);
      return;
    }

    story_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Payment ) Feature', async () => {
    const result = await service.payment(story_id, user_id);

    if (result instanceof CustomException) {
      const error = result.getError() as { status: number; message: string };

      expect(error.status).toEqual(409);
      return;
    }

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Status ) Feature', async () => {
    const result = await service.updateStatus({
      id: story_id,
      status: StoryStatusEnum.ACTIVE,
    });

    if (result instanceof CustomException) {
      const error = result.getError() as { status: number; message: string };

      expect(error.status).toEqual(404);
      return;
    }

    expect(result.status).toEqual(204);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(story_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Like ) Feature', async () => {
    const result = await service.findOne(story_id, true);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(story_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Product ) Feature', async () => {
    const result = await productService.remove(product_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Update Store Status ) Feature', async () => {
    const result = await storeService.updateStatus({
      id: store_id,
      status: StoreStatusEnum.DELETED,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Store ) Feature', async () => {
    const result = await storeService.remove(store_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Category ) Feature', async () => {
    const result = await categoryService.remove(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Brand ) Feature', async () => {
    const result = await brandService.remove(brand_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Feature', async () => {
    const result = await mediaService.remove(video_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Color ) Feature', async () => {
    const result = await colorService.remove(color_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

  it('Test ( Delete Specification ) Feature', async () => {
    const result = await specificationService.remove(specification_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Feature', async () => {
    const result = await usersService.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
