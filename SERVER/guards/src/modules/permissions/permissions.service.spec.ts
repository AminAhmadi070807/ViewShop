import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Permission ) Service', () => {
  let module: TestingModule;
  let service: PermissionsService;

  let permission_id: string;
  const title: string = 'Unit Service Test';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
  });

  afterAll(async () => {
    await service.remove(permission_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ title });

    if (result instanceof CustomException) throw result

    permission_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(permission_id);

    if (result instanceof CustomException) throw result

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(permission_id);

    if (result instanceof CustomException) throw result

    expect(result.status).toEqual(204);
  });
});
