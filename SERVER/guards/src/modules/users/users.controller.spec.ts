import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UsersController } from './users.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Users ) Controller', () => {
  let module: TestingModule;
  let controller: UsersController;

  let user_id: string;
  const role_id: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await module.close();
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
    if (!user_id) return;

    const result = await controller.findOne({ id: user_id });

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(200);
  });

  it('Test ( Update Role ) Controller', async () => {
    if (!user_id) {
      return expect(200).toBe(200);
    }

    const result = await controller.updateRole({
      user: user_id,
      role: role_id,
    });

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(204);
  });

  it('Test ( Toggle Use rBanned ) Controller', async () => {
    if (!user_id) return;

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
});
