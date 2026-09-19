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

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: menu_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: menu_id,
      alias,
      section,
      title,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.update({ id: menu_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
