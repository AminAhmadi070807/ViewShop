import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('Test(USER SERVICE)', () => {
  let service: UsersService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('TEST(USER ROUTE)', () => {});
});
