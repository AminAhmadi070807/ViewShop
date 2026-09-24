import { Test, TestingModule } from '@nestjs/testing';
import { GuardsController } from './guards.controller';
import { AppModule } from '../../app.module';
import { GuardEnum, MethodEnum } from '../../common/enums/guards/guard.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { PermissionsController } from '../permissions/permissions.controller';
import { FeaturesController } from '../features/features.controller';
import { RolesController } from '../roles/roles.controller';

describe('Test ( Guards ) Controller ', () => {
  let module: TestingModule;
  let controller: GuardsController;
  let permissionsController: PermissionsController;
  let featuresController: FeaturesController;
  let roleController: RolesController;

  let guard_id: string;
  let permission_id: string;
  let feature_id: string;
  let role_id: string;

  const title: string = crypto.randomUUID();
  const method: MethodEnum = MethodEnum.POST;
  const service: GuardEnum = GuardEnum.GUARDS;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<GuardsController>(GuardsController);
    featuresController = module.get<FeaturesController>(FeaturesController);
    roleController = module.get<RolesController>(RolesController);
    permissionsController = module.get<PermissionsController>(
      PermissionsController,
    );
  });

  afterAll(async () => {
    await controller.remove({ id: guard_id });
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
      public: false,
      permission: permission_id,
      feature: feature_id,
      method,
      service,
    });

    if (result instanceof CustomException) return result;

    guard_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: guard_id });

    if (result instanceof CustomException) return result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: guard_id });

    if (result instanceof CustomException) return result;

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
