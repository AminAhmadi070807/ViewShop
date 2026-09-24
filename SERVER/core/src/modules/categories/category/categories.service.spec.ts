import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { CategoriesService } from './categories.service';
import { MediaService } from '../../media/media.service';
import { UsersService } from '../../users/users.service';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';
import { randomInt } from 'crypto';

describe('Test ( Categories ) Service', () => {
  let module: TestingModule;
  let service: CategoriesService;
  let usersService: UsersService;
  let mediaService: MediaService;

  let category_id: string;
  let user_id: string;
  let icon_id: string;

  const title: string = `Unit Service ${randomInt(100, 10000)} Test`;
  const alias: string = `unit-service-${randomInt(100, 10000)}-test`;

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    usersService = module.get<UsersService>(UsersService);
    mediaService = module.get<MediaService>(MediaService);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await service.remove(category_id);
    await mediaService.remove(icon_id);
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
      title: crypto.randomUUID(),
      type: MediaTypeEnum.PUBLIC,
      path: `https://viewshop.ir/${crypto.randomUUID()}.png`,
    });

    icon_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      user: user_id,
      title,
      alias,
      icon: icon_id,
    });

    if (result instanceof CustomException) throw result;

    category_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: category_id,
      icon: icon_id,
      title,
      alias,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(category_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Media ) Controller', async () => {
    const result = await mediaService.remove(icon_id);

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
