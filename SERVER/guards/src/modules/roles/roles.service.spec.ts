import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Roles ) Service', () => {
  let module: TestingModule;
  let service: RolesService;

  let role_id: string;

  const title: string = 'Unit Service Test';
  const description: string = 'Test description';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<RolesService>(RolesService);
  });

  afterAll(async () => {
    await service.remove(role_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ title, description });

    if (result instanceof CustomException) throw result;

    role_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toBe(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(role_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(200);
  });

  it('Test ( FindById ) Feature', async () => {
    const result = await service.findByIds([role_id]);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({ title, description, id: role_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(role_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });
});
