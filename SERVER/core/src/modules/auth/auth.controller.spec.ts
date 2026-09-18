import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Auth ) Controller', () => {
  let module: TestingModule;
  let controller: AuthController;

  const fullName: string = 'John Doe';
  const password: string = '12345678910';
  const phone: string = '09144676520';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( Register ) Controller', async () => {
    const result = await controller.register({ phone, fullName, password });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(201);
  });
});
