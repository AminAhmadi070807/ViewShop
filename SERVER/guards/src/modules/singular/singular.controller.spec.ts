import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SingularController } from './singular.controller';

describe('Test ( Singular ) Controller', () => {
  let module: TestingModule;
  let controller: SingularController;

  let singular_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SingularController>(SingularController);
  });

  afterAll(async () => {
    await controller.remove({ id: singular_id });
    await module.close();
  });
});
