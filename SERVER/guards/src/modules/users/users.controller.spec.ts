import { Test, TestingModule } from '@nestjs/testing';
import { SingularController } from '../singular/singular.controller';
import { AppModule } from '../../app.module';

describe('Test ( Users ) Controller', () => {
  let module: TestingModule;
  let controller: SingularController;

  let user_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SingularController>(SingularController);
  });

  afterAll(async () => {
    await controller.remove({ id: user_id });
    await module.close();
  });
});
