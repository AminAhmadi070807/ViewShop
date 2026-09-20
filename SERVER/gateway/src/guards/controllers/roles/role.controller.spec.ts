import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { RoleController } from './role.controller';

describe('Test ( Role ) Controller', () => {
  let module: TestingModule;
  let controller: RoleController;

  let permission_id: string;

  const title: string = 'Unit Test';
  const description: string = 'Unit Test description for roles';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  afterAll(async () => {
    controller.remove({ id: permission_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title, description }),
    )) as ResultInterface;

    if (result.status === 201) permission_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
