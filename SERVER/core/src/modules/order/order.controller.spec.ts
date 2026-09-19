import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { OrderController } from './order.controller';

describe('Test ( NewsLetter ) Controller', () => {
  let module: TestingModule;
  let controller: OrderController;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterAll(async () => {
    await module.close();
  });
});
