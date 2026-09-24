import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UsersController } from './users.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { RolesController } from '../roles/roles.controller';

describe('Test ( Users ) Controller', () => {
  let module: TestingModule;
  let controller: UsersController;
  let roleController: RolesController;

  let user_id: string;
  let role_id: string;

  const title: string = crypto.randomUUID();

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UsersController>(UsersController);
    roleController = module.get<RolesController>(RolesController);
  });

  afterAll(async () => {
    await controller.remove({ id: user_id });
    await roleController.remove({ id: role_id });
    await module.close();
  });

  it('Test ( Create Role ) Controller', async () => {
    const result = await roleController.create({
      title: `ADMIN`,
      description: title,
    });

    if (result instanceof CustomException) throw result;

    role_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ id: crypto.randomUUID() });

    if (result instanceof CustomException) return result;

    user_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    if (result.body.length) user_id = result.body[0].id;

    expect(result.status).toBe(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: user_id });

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(200);
  });

  it('Test ( Update Role ) Controller', async () => {
    const result = await controller.updateRole({
      user: user_id,
      role: role_id,
    });

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(204);
  });

  it('Test ( Toggle User Banned ) Controller', async () => {
    const result = await controller.toggleUserBanned({
      id: user_id,
    });

    if (result instanceof CustomException) return result;

    if (result.status === 409) {
      expect(result.status).toBe(409);
      return;
    }

    expect(result.status).toBe(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({
      id: user_id,
    });

    if (result instanceof CustomException) return result;

    if (result.status === 409) {
      expect(result.status).toBe(409);
      return;
    }

    expect(result.status).toBe(204);
  });

  it('Test ( Delete Role ) Controller', async () => {
    const result = await roleController.remove({ id: role_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
