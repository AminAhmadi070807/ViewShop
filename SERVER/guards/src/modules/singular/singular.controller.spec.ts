import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SingularController } from './singular.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Singular ) Controller', () => {
  let module: TestingModule;
  let controller: SingularController;

  let singular_id: string;

  const permission_id: string = '1acf6d34-45a2-484e-8c0b-03ac544f660e';
  const feature_id: string = '8e566a93-4cfb-473c-9ac1-68c8efa22824';
  const role_id: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SingularController>(SingularController);
  });

  afterAll(async () => {
    await controller.remove({ id: singular_id });
    await module.close();
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
});
