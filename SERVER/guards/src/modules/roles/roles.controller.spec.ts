import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Role ) Controller', () => {
  let module: TestingModule;
  let controller: RolesController;

  let role_id: string;

  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const description: string = `Test ${crypto.randomUUID()} description`;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  afterAll(async () => {
    await controller.remove({ id: role_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ title, description });

    if (result instanceof CustomException) throw result;

    role_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: role_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({ id: role_id, title, description });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: role_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
