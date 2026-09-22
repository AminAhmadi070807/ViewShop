import { Test, TestingModule } from '@nestjs/testing';
import { FiltersController } from './filters.controller';
import { AppModule } from '../../app.module';
import { FilterTypeEnum } from '../../common/enums/filters/filter.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { randomInt } from 'node:crypto';
import crypto from 'crypto';

describe('Test ( Filters ) Controller', () => {
  let module: TestingModule;
  let controller: FiltersController;

  let filter_id: string;

  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const type: FilterTypeEnum = FilterTypeEnum.SWITCH;
  const details = [
    { title: `ابی ${randomInt(100, 999)}` },
    { title: `قرمز ${randomInt(100, 999)}` },
    { title: `نارنجی ${randomInt(100, 999)}` },
  ];

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<FiltersController>(FiltersController);
  });

  afterAll(async () => {
    await controller.remove({ id: filter_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ title, type, details });

    if (result instanceof CustomException) throw result;

    filter_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: filter_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = await controller.update({
      id: filter_id,
      type,
      details,
      title,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: filter_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
