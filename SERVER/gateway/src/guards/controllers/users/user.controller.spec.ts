import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { UserController } from './user.controller';

describe('Test ( User ) Controller', () => {
  let module: TestingModule;
  let controller: UserController;

  const user_id = crypto.randomUUID();
  const role: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterAll(async () => {
    controller.remove({ id: user_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ id: user_id }),
    )) as ResultInterface;

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
      controller.findOne({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update Role ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.updateRole({ user: user_id, role }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Toggle Banned ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.toggleBanned({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.toggleBanned({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
