import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { FeaturesController } from './features.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { RolesController } from '../roles/roles.controller';

describe('Test ( Feature ) Controller', () => {
  let module: TestingModule;
  let controller: FeaturesController;
  let roleController: RolesController;

  let feature_id: string;
  let role_id: string;

  const title = `Unit ${crypto.randomUUID()} Test`;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<FeaturesController>(FeaturesController);
    roleController = module.get<RolesController>(RolesController);
  });

  afterAll(async () => {
    await controller.remove({ id: feature_id });
    await roleController.remove({ id: role_id });
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

  it('Test ( Create ) Controller ', async () => {
    const result = await controller.create({ title, roles: [role_id] });

    if (result instanceof CustomException) throw result;

    feature_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: feature_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: feature_id,
      title: title,
      roles: [role_id],
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: feature_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Role ) Controller', async () => {
    const result = await roleController.remove({ id: role_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
