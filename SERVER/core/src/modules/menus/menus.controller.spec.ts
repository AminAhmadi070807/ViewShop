import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MenusController } from './menus.controller';

describe('Test ( Menus ) Controller', () => {
  let module: TestingModule;
  let controller: MenusController;

  let menus_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MenusController>(MenusController);
  });

  afterAll(async () => {
    await controller.remove({ id: menus_id });
    await module.close();
  });
});
