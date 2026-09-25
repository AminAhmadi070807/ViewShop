import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { GuardController } from './guard.controller';
import {
  GuardEnum,
  MethodEnum,
} from '../../../common/enums/guards/guards/guard.enum';
import { PermissionsController } from '../permissions/permission.controller';
import { FeatureController } from '../features/feature.controller';
import { RoleController } from '../roles/role.controller';

describe('Test ( Guard ) Controller', () => {
  let module: TestingModule;
  let controller: GuardController;
  let permissionController: PermissionsController;
  let featureController: FeatureController;
  let roleController: RoleController;

  let guard_id: string;
  let role_id: string;
  let permission_id: string;
  let feature_id: string;

  const method: MethodEnum = MethodEnum.POST;
  const service: GuardEnum = GuardEnum.GUARDS;

  const title = `Unit ${crypto.randomUUID()} Test`;
  const description: string = `Unit Test ${crypto.randomUUID()} description for roles`;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<GuardController>(GuardController);
    permissionController = module.get<PermissionsController>(
      PermissionsController,
    );
    featureController = module.get<FeatureController>(FeatureController);
    roleController = module.get<RoleController>(RoleController);
  });

  afterAll(async () => {
    controller.remove({ id: guard_id });
    permissionController.remove({ id: permission_id });
    featureController.remove({ id: feature_id });
    roleController.remove({ id: role_id });
    await module.close();
  });

  it('Test ( Create Role ) Controller', async () => {
    const result = (await firstValueFrom(
      roleController.create({ title, description }),
    )) as ResultInterface;

    if (result.status === 201) role_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Feature ) Controller', async () => {
    const result = (await firstValueFrom(
      featureController.create({ title, roles: [role_id] }),
    )) as ResultInterface;

    if (result.status === 201) feature_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Permission ) Controller', async () => {
    const result = (await firstValueFrom(
      permissionController.create({ title }),
    )) as ResultInterface;

    if (result.status === 201) permission_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({
        permission: permission_id,
        feature: feature_id,
        service,
        method,
        public: false,
      }),
    )) as ResultInterface;

    if (result.status === 201) guard_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: guard_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: guard_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Permission ) Controller', async () => {
    const result = (await firstValueFrom(
      permissionController.remove({ id: permission_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Feature ) Controller', async () => {
    const result = (await firstValueFrom(
      featureController.remove({ id: feature_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Role ) Controller', async () => {
    const result = (await firstValueFrom(
      roleController.remove({ id: role_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
