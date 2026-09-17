import { Test, TestingModule } from '@nestjs/testing';
import { GuardsController } from './guards.controller';
import { AppModule } from '../../app.module';
import { GuardEnum, MethodEnum } from '../../common/enums/guards/guard.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Guards ) Controller ', () => {
  let module: TestingModule;
  let controller: GuardsController;

  let guard_id: string;

  const permission_id: string = '1acf6d34-45a2-484e-8c0b-03ac544f660e';
  const feature_id: string = '8e566a93-4cfb-473c-9ac1-68c8efa22824';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<GuardsController>(GuardsController);
  });

  afterAll(async () => {
    await controller.remove({ id: guard_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      public: false,
      permission: permission_id,
      feature: feature_id,
      method: MethodEnum.POST,
      service: GuardEnum.GUARDS,
    });

    if (result instanceof CustomException) return result;

    guard_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
