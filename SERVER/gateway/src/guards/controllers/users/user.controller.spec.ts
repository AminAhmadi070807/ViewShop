import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { UserController } from './user.controller';

describe('Test ( User ) Controller', () => {
  let module: TestingModule;
  let controller: UserController;

  const user_id = crypto.randomUUID();

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

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(201);
  });
});
