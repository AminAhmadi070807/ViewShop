import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MenuSectionEnum } from '../../common/enums/sections/section.enum';
import { MenusService } from './menus.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';

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

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ title, alias, section });

    if (result instanceof CustomException) throw result;

    menu_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(menu_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: menu_id,
      alias,
      section,
      title,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
