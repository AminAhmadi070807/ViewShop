import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { UserController } from './user.controller';

describe('Test ( User ) Controller', () => {
  let module: TestingModule;
  let controller: UserController;

  let user_id: string = crypto.randomUUID();

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterAll(async () => {
    controller.remove({ id: user_id });
    await module.close();
  });
});
