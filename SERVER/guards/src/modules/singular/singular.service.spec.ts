import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { SingularService } from './singular.service';
import { FeaturesService } from '../features/features.service';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';

describe('Test ( Singular ) Service', () => {
  let module: TestingModule;
  let service: SingularService;
  let featuresService: FeaturesService;
  let rolesService: RolesService;
  let permissionsService: PermissionsService;

  let singular_id: string;

  let permission_id: string;
  let feature_id: string;
  let role_id: string;

  const title: string = crypto.randomUUID();

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<SingularService>(SingularService);
    featuresService = module.get<FeaturesService>(FeaturesService);
    rolesService = module.get<RolesService>(RolesService);
    permissionsService = module.get<PermissionsService>(PermissionsService);
  });

  afterAll(async () => {
    await service.remove({ id: singular_id });
    await featuresService.remove(feature_id);
    await rolesService.remove(role_id);
    await permissionsService.remove(permission_id);
    await module.close();
  });

  it('Test ( Create Role ) Feature', async () => {
    const result = await rolesService.create({ title, description: title });

    if (result instanceof CustomException) throw result;

    role_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( Create Feature ) Feature', async () => {
    const result = await featuresService.create({
      title,
      roles: [role_id],
    });

    if (result instanceof CustomException) throw result;

    feature_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Permission ) Feature', async () => {
    const result = await permissionsService.create({ title });

    if (result instanceof CustomException) throw result;

    permission_id = result.body.id;

    expect(result.status).toBe(201);
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

  it('Test ( Delete Feature ) Feature', async () => {
    const result = await featuresService.remove(feature_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Role ) Feature', async () => {
    const result = await rolesService.remove(role_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

  it('Test ( Delete Permission ) Feature', async () => {
    const result = await permissionsService.remove(permission_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
