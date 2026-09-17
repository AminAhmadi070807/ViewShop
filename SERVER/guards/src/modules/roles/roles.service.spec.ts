import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { AppModule } from '../../app.module';

describe('Test ( Roles ) Service', () => {
  let module: TestingModule;
  let service: RolesService;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<RolesService>(RolesService);
  });
});
