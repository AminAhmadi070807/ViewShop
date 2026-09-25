import { Test, TestingModule } from '@nestjs/testing';
import { FeatureController } from './feature.controller';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { RoleController } from '../roles/role.controller';

describe('Test ( Feature ) Controller', () => {
  let module: TestingModule;
  let controller: FeatureController;
  let roleController: RoleController;

  let feature_id: string;
  let role_id: string;

  const title = `Unit ${crypto.randomUUID()} Test`;
  const description: string = `Unit Test ${crypto.randomUUID()} description for roles`;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<FeatureController>(FeatureController);
    roleController = module.get<RoleController>(RoleController);
  });

  afterAll(async () => {
    controller.remove({ id: feature_id });
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

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title, roles: [role_id] }),
    )) as ResultInterface;

    if (result.status === 201) feature_id = result.body.id;

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
      controller.findOne({ id: feature_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: feature_id, title, roles: [role_id] }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: feature_id }),
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
