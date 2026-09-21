import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { FilterController } from './filter.controller';
import { FilterTypeEnum } from '../../../common/enums/filters/filter.enum';

describe('Test ( Comment ) Controller', () => {
  let module: TestingModule;
  let controller: FilterController;

  let filter_id: string;

  const title: string = 'Unit Test';
  const type: FilterTypeEnum = FilterTypeEnum.SWITCH;
  const details = [{ title: 'ابی' }, { title: 'قرمز' }, { title: 'نارنجی' }];

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<FilterController>(FilterController);
  });

  afterAll(async () => {
    controller.remove({ id: filter_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title, details, type }),
    )) as ResultInterface;

    if (result.status === 201) filter_id = result.body.id;

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
      controller.findOne({ id: filter_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: filter_id, type, details, title }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
