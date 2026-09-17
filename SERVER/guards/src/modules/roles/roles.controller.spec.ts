import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { AppModule } from '../../app.module';

describe('Test ( Role ) Controller', () => {
  let module: TestingModule;
  let controller: RolesController;

  let role_id: string;

  const title: string = 'Unit Test';
  const description: string = 'Test description';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  afterAll(async () => {
    await controller.remove({ id: role_id });
    await module.close();
  });
});
