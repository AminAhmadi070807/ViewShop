import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { SingularService } from './singular.service';

describe('Test ( Singular ) Service', () => {
  let module: TestingModule;
  let service: SingularService;

  let singular_id: string;

  const permission_id: string = '1acf6d34-45a2-484e-8c0b-03ac544f660e';
  const feature_id: string = '8e566a93-4cfb-473c-9ac1-68c8efa22824';
  const role_id: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<SingularService>(SingularService);
  });

  afterAll(async () => {
    await service.remove({ id: singular_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      feature: feature_id,
      data: [{ role: role_id, permissions: [permission_id] }],
    });

    if (result instanceof CustomException) throw result;

    singular_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( ToggleAccess ) Feature', async () => {
    const result = await service.toggleAccess({
      id: singular_id,
      permission: permission_id,
      role: role_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove({ id: singular_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
