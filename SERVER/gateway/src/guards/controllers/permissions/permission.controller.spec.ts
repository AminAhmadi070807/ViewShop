import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { PermissionsController } from './permission.controller';

describe('Test ( Permission ) Controller', () => {
  let module: TestingModule;
  let controller: PermissionsController;

  let permission_id: string;

  const title: string = 'Unit Test';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  afterAll(async () => {
    controller.remove({ id: permission_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title }),
    )) as ResultInterface;

    if (result.status === 201) permission_id = result.body.id;

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
      controller.findOne({ id: permission_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });
});
