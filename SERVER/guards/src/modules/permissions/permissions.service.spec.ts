import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { AppModule } from '../../app.module';

describe('Test ( Permission ) Service', () => {
  let module: TestingModule;
  let service: PermissionsService;

  let permission_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
  });

  afterAll(async () => {
    await service.remove(permission_id);
    await module.close();
  });
});
