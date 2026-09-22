import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { MediaService } from './media.service';
import { randomInt } from 'node:crypto';
import { UsersService } from '../users/users.service';

describe('Test ( Media ) Service', () => {
  let module: TestingModule;
  let service: MediaService;
  let usersService: UsersService;

  let media_id: string;
  let user_id: string;

  const path: string = `/media/controller/${crypto.randomUUID()}.png`;
  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const type: MediaTypeEnum = MediaTypeEnum.PUBLIC;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<MediaService>(MediaService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await service.remove(media_id);
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

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ path, user: user_id, title, type });

    media_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( Search ) Feature', async () => {
    const result = await service.search(title);

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(media_id);

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
