import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { PermissionsController } from './permission.controller';

describe('Test ( Permission ) Controller', () => {
  let module: TestingModule;
  let controller: PermissionsController;

  let permission_id: string;

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
});
