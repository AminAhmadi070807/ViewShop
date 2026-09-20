import { Test, TestingModule } from '@nestjs/testing';
import { FeatureController } from './feature.controller';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';

describe('Test ( Feature ) Controller', () => {
  let module: TestingModule;
  let controller: FeatureController;

  let feature_id: string;

  const title = 'Unit Test';
  const role_id = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<FeatureController>(FeatureController);
  });

  afterAll(async () => {
    controller.remove({ id: feature_id });
    await module.close();
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
});
