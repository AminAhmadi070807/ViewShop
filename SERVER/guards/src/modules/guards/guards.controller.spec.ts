import { Test, TestingModule } from '@nestjs/testing';
import { GuardsController } from './guards.controller';
import { AppModule } from '../../app.module';

describe('Test ( Guards ) Controller ', () => {
  let module: TestingModule;
  let controller: GuardsController;

  let guard_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<GuardsController>(GuardsController);
  });

  afterAll(async () => {
    await controller.remove(guard_id);
    await module.close();
  });
});
