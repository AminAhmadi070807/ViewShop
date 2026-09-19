import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { OrderService } from './order.service';

describe('Test ( Order ) Service', () => {
  let module: TestingModule;
  let service: OrderService;

  let order_id: string;

  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const address: string = '499b6fc9-2f5a-4a5d-899b-c7e5e32aab4d';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<OrderService>(OrderService);
  });

  afterAll(async () => {
    await service.remove(order_id);
    await module.close();
  });
});
