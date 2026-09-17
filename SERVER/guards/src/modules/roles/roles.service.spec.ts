import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Roles ) Service', () => {
  let module: TestingModule;
  let service: RolesService;

  let role_id: string;

  const title: string = 'Unit Test';
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

    if (result instanceof CustomException) throw new Error(result.message);

    role_id = result.body.id;

    expect(result.status).toBe(201);
  });
});
