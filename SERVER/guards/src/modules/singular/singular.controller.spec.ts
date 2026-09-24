import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SingularController } from './singular.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { PermissionsController } from '../permissions/permissions.controller';
import { FeaturesController } from '../features/features.controller';
import { RolesController } from '../roles/roles.controller';

describe('Test ( Singular ) Controller', () => {
  let module: TestingModule;
  let controller: SingularController;
  let permissionsController: PermissionsController;
  let featuresController: FeaturesController;
  let roleController: RolesController;

  let singular_id: string;
  let permission_id: string;
  let feature_id: string;
  let role_id: string;

  const title: string = crypto.randomUUID();

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SingularController>(SingularController);
    featuresController = module.get<FeaturesController>(FeaturesController);
    roleController = module.get<RolesController>(RolesController);
    permissionsController = module.get<PermissionsController>(
      PermissionsController,
    );
  });

  afterAll(async () => {
    await controller.remove({ id: singular_id });
    await featuresController.remove({ id: feature_id });
    await roleController.remove({ id: role_id });
    await permissionsController.remove({ id: permission_id });
    await module.close();
  });

  it('Test ( Create Role ) Controller', async () => {
    const result = await roleController.create({
      title,
      description: title,
    });

    if (result instanceof CustomException) throw result;

    role_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Feature ) Controller ', async () => {
    const result = await featuresController.create({ title, roles: [role_id] });

    if (result instanceof CustomException) throw result;

    feature_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( Create Permission ) Controller', async () => {
    const result = await permissionsController.create({ title });

    if (result instanceof CustomException) throw result;

    permission_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      feature: feature_id,
      data: [{ role: role_id, permissions: [permission_id] }],
    });

    if (result instanceof CustomException) throw result;

    singular_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Toggle Access ) Controller', async () => {
    const result = await controller.toggleAccess({
      role: role_id,
      id: singular_id,
      permission: permission_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: singular_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Feature ) Controller', async () => {
    const result = await featuresController.remove({ id: feature_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Role ) Controller', async () => {
    const result = await roleController.remove({ id: role_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Permission ) Controller', async () => {
    const result = await permissionsController.remove({ id: permission_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
