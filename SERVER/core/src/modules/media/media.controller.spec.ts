import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MediaController } from './media.controller';
import { MediaTypeEnum } from '../../common/enums/media/media.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { randomInt } from 'node:crypto';
import { UsersController } from '../users/users.controller';

describe('Test ( Media ) Controller', () => {
  let module: TestingModule;
  let controller: MediaController;
  let usersController: UsersController;

  let media_id: string;
  let user_id: string;

  const path: string = `/media/controller/${crypto.randomUUID()}.png`;
  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const type: MediaTypeEnum = MediaTypeEnum.PUBLIC;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MediaController>(MediaController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await controller.remove({ id: media_id });
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

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      path,
      user: user_id,
      title,
      type,
    });

    media_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( Search ) Controller', async () => {
    const result = await controller.search({ title });

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: media_id });

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
