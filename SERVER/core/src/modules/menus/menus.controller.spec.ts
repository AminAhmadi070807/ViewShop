import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MenusController } from './menus.controller';
import { MenuSectionEnum } from '../../common/enums/sections/section.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Menus ) Controller', () => {
  let module: TestingModule;
  let controller: MenusController;

  let menu_id: string;

  const title: string = 'Unit Test';
  const section: MenuSectionEnum = MenuSectionEnum.HEADER;
  const alias: string = 'unit-test';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MenusController>(MenusController);
  });

  afterAll(async () => {
    await controller.remove({ id: menu_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ title, alias, section });

    if (result instanceof CustomException) throw result;

    menu_id = result.body.id;

    expect(result.message).toBeDefined();
  });
});
