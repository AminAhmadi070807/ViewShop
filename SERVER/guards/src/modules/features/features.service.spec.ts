import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

import { FeaturesService } from './features.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { RolesService } from '../roles/roles.service';

describe('Test ( Feature ) Service ', () => {
  let module: TestingModule;
  let service: FeaturesService;
  let rolesService: RolesService;

  let feature_id: string;
  let role_id: string;

  const title = `Unit ${crypto.randomUUID()} Test`;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
    rolesService = module.get<RolesService>(RolesService);
  });

  afterAll(async () => {
    await service.remove(feature_id);
    await rolesService.remove(role_id);
    await module.close();
  });

  it('Test ( Create Role ) Feature', async () => {
    const result = await rolesService.create({ title, description: title });

    if (result instanceof CustomException) throw result;

    role_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      title,
      roles: [role_id],
    });

    if (result instanceof CustomException) throw result;

    feature_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(feature_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: feature_id,
      title: title,
      roles: [role_id],
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(feature_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Role ) Feature', async () => {
    const result = await rolesService.remove(role_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });
});
