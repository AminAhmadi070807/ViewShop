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

  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const section: MenuSectionEnum = MenuSectionEnum.HEADER;
  const alias: string = crypto.randomUUID();

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<MenusController>(MenusController);
  });

  afterAll(async () => {
    controller.remove({ id: menu_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title, section, alias }),
    )) as ResultInterface;

    if (result.status === 201) menu_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findOne({ id: menu_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: menu_id, section, alias, title }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: menu_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
