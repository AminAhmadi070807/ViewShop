import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { MenusController } from './menu.controller';
import { MenuSectionEnum } from './menu.dto';

describe('Test ( Menu ) Controller', () => {
  let module: TestingModule;
  let controller: MenusController;

  let menu_id: string;

  const title: string = 'Unit Test';
  const section: MenuSectionEnum = MenuSectionEnum.HEADER;
  const alias: string = 'unit-test';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MenusController>(MenusController);
  });

  afterAll(async () => {
    controller.delete({ id: menu_id });
    await module.close();
  });
});
