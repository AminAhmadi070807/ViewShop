import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { UserController } from './user.controller';
import { RoleController } from '../roles/role.controller';

describe('Test ( User => Guard ) Controller', () => {
  let module: TestingModule;
  let controller: UserController;
  let roleController: RoleController;

  let user_id: string;
  let role_id: string;

  const title = crypto.randomUUID();
  const description: string = `Unit Test ${crypto.randomUUID()} description for roles`;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UserController>(UserController);
    roleController = module.get<RoleController>(RoleController);
  });

  afterAll(async () => {
    controller.remove({ id: user_id });
    roleController.remove({ id: role_id });
    await module.close();
  });

  it('Test ( Create Role ) Controller', async () => {
    const result = (await firstValueFrom(
      roleController.create({ title: `ADMIN-${title}`, description }),
    )) as ResultInterface;

    if (result.status === 201) role_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ id: title }, true),
    )) as ResultInterface;

    if (result.status === 201) user_id = result.body.id;

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
      controller.updateRole({ user: user_id, role: role_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Toggle Banned ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.toggleBanned({ id: user_id }),
    )) as ResultInterface;

    if (result.status === 409) {
      expect(result.status).toEqual(409);
      return;
    }

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Role ) Controller', async () => {
    const result = (await firstValueFrom(
      roleController.remove({ id: role_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
