import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AppModule } from '../../app.module';

describe('Test ( Auth ) Controller', () => {
  let module: TestingModule;
  let controller: AuthController;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await module.close();
  });
});
