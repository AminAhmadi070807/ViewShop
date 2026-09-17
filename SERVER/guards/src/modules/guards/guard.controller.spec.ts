import { Test, TestingModule } from '@nestjs/testing';
import { GuardsController } from './guards.controller';
import { AppModule } from '../../app.module';

describe('Test ( Guard ) Controller', () => {
  let module: TestingModule;
  let controller: GuardsController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<GuardsController>(GuardsController);
  });

  afterAll(async () => {
    await module.close();
  });
});
