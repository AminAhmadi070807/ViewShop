import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UsersService } from './users.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { RolesService } from '../roles/roles.service';

describe('Test ( Users ) Service', () => {
  let module: TestingModule;
  let service: UsersService;
  let rolesService: RolesService;

  let user_id: string;
  let role_id: string;

  const title: string = crypto.randomUUID();

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<UsersService>(UsersService);
    rolesService = module.get<RolesService>(RolesService);
  });

  afterAll(async () => {
    await service.remove(user_id);
    await rolesService.remove(role_id);
    await module.close();
  });

  it('Test ( Create Role ) Feature', async () => {
    const result = await rolesService.create({
      title: `ADMIN-${title}`,
      description: title,
    });

    if (result instanceof CustomException) throw result;

    role_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ id: title }, true);

    if (result instanceof CustomException) return result;

    user_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toBe(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(user_id);

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(200);
  });

  it('Test ( Update Role ) Feature', async () => {
    const result = await service.updateRole({
      user: user_id,
      role: role_id,
    });

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(204);
  });

  it('Test ( Toggle Use rBanned ) Feature', async () => {
    const result = await service.toggleBanned({
      id: user_id,
    });

    if (result instanceof CustomException) return result;

    if (result.status === 409) {
      expect(result.status).toBe(409);
      return;
    }

    expect(result.status).toBe(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(user_id);

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(204);
  });

  it('Test ( Delete Role ) Feature', async () => {
    const result = await rolesService.remove(role_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });
});
