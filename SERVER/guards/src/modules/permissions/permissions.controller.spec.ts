import { PermissionsController } from './permissions.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Permission ) Controller ', () => {
  let controller: PermissionsController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( Permission ) Controller', async () => {
    const result = await controller.create({ title: 'Test Unit' });

    if (result instanceof CustomException) throw new Error(result.message);

    expect(result.status).toEqual(201);
  });
});
