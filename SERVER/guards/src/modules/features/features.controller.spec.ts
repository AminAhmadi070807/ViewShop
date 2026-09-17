import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { FeaturesController } from './features.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Feature ) Controller', () => {
  let controller: FeaturesController;
  let module: TestingModule;

  let feature_id: string;
  const title = 'Unit Test';
  const role_id = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<FeaturesController>(FeaturesController);
  });

  afterAll(async () => {
    await controller.remove({ id: feature_id });
    await module.close();
  });

  it('Test ( Create ) Controller ', async () => {
    const result = await controller.create({ title, roles: [role_id] });

    if (result instanceof CustomException) throw new Error(result.message);

    feature_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: feature_id });

    if (result instanceof CustomException) throw new Error(result.message);

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: feature_id,
      title: title,
      roles: [role_id],
    });

    if (result instanceof CustomException) throw new Error(result.message);

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: feature_id });

    if (result instanceof CustomException) throw new Error(result.message);

    expect(result.status).toEqual(204);
  });
});
