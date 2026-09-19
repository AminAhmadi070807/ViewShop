import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { OrderController } from './order.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( NewsLetter ) Controller', () => {
  let module: TestingModule;
  let controller: OrderController;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const address: string = '499b6fc9-2f5a-4a5d-899b-c7e5e32aab4d';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ user, address });

    if (result instanceof CustomException) throw result;
  });
});
