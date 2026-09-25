import { MediaController } from './media.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { UsersController } from '../users/user.controller';
import { firstValueFrom } from 'rxjs';
import { randomInt } from 'crypto';
import { ResultInterface } from '../../../common/interface/result.interface';
import { MediaTypeEnum } from '../../../common/enums/media/media.enum';

describe('Test ( Upload ) Controller', () => {
  let module: TestingModule;
  let controller: MediaController;
  let usersController: UsersController;

  let user_id: string;
  let media_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MediaController>(MediaController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    controller.remove({ id: media_id });
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

  it('Test ( Create ) Controller', async () => {
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
      controller.upload(
        file,
        {
          title: crypto.randomUUID(),
          type: MediaTypeEnum.PUBLIC,
          media: crypto.randomUUID(),
        },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 200) media_id = result.body.id;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Search ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.search({ title: 'unit test' }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: media_id }),
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
