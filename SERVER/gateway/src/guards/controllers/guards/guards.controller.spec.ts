import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { GuardController } from './guard.controller';
import {
  GuardEnum,
  MethodEnum,
} from '../../../common/enums/guards/guards/guard.enum';

describe('Test ( Guard ) Controller', () => {
  let module: TestingModule;
  let controller: GuardController;

  let guard_id: string;

  const permission: string = '1acf6d34-45a2-484e-8c0b-03ac544f660e';
  const feature: string = '8e566a93-4cfb-473c-9ac1-68c8efa22824';
  const method: MethodEnum = MethodEnum.POST;
  const service: GuardEnum = GuardEnum.GUARDS;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<GuardController>(GuardController);
  });

  afterAll(async () => {
    controller.remove({ id: guard_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({
        permission,
        feature,
        service,
        method,
        public: false,
      }),
    )) as ResultInterface;

    if (result.status === 201) guard_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });
});
