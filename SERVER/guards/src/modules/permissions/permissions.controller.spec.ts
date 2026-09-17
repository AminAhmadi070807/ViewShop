import { PermissionsController } from './permissions.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

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
});
