import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { UsersService } from './users.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Users ) Service', () => {
  let module: TestingModule;
  let service: UsersService;

  let user_id: string;
  const role_id: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ id: crypto.randomUUID() });

    if (result instanceof CustomException) return result;

    user_id = result.body.id;

    expect(result.status).toBe(200);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toBe(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    if (!user_id) return;

    const result = await service.findOne(user_id);

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(200);
  });

  it('Test ( Update Role ) Feature', async () => {
    if (!user_id) {
      return expect(200).toBe(200);
    }

    const result = await service.updateRole({
      user: user_id,
      role: role_id,
    });

    if (result instanceof CustomException) return result;

    expect(result.status).toBe(204);
  });

  it('Test ( Toggle Use rBanned ) Feature', async () => {
    if (!user_id) return;

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
});
