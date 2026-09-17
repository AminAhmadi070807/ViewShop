import { PermissionsController } from './permissions.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Permission ) Controller ', () => {
  let controller: PermissionsController;
  let module: TestingModule;

  let permission_id: string;
  const title: string = 'unit test';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  afterAll(async () => {
    await controller.remove({ id: permission_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ title });

    if (result instanceof CustomException) throw new Error(result.message);

    permission_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: permission_id });

    if (result instanceof CustomException) throw new Error(result.message);

    expect(result.status).toEqual(200);
  });
});
