import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { SingularController } from './singular.controller';

describe('Test ( Singular ) Controller', () => {
  let module: TestingModule;
  let controller: SingularController;

  let role_id: string;

  const permission_id: string = '1acf6d34-45a2-484e-8c0b-03ac544f660e';
  const feature_id: string = '8e566a93-4cfb-473c-9ac1-68c8efa22824';
  const role_id: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SingularController>(SingularController);
  });

  afterAll(async () => {
    controller.remove({ id: role_id });
    await module.close();
  });
});
