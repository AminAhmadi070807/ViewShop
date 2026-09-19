import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MenuSectionEnum } from '../../common/enums/sections/section.enum';
import { MenusService } from './menus.service';

describe('Test ( Menus ) Service', () => {
  let module: TestingModule;
  let service: MenusService;

  let menu_id: string;

  const title: string = 'Unit Test';
  const section: MenuSectionEnum = MenuSectionEnum.HEADER;
  const alias: string = 'unit-test';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<MenusService>(MenusService);
  });

  afterAll(async () => {
    await service.remove(menu_id);
    await module.close();
  });
});
