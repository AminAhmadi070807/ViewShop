import { Test, TestingModule } from '@nestjs/testing';
import { FiltersController } from './filters.controller';
import { AppModule } from '../../app.module';
import { FilterTypeEnum } from '../../common/enums/filters/filter.enum';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { FiltersService } from './filters.service';

describe('Test ( Filters ) Service', () => {
  let module: TestingModule;
  let service: FiltersService;

  let filter_id: string;

  const title: string = 'Unit Test';
  const type: FilterTypeEnum = FilterTypeEnum.SWITCH;
  const details = [{ title: 'ابی' }, { title: 'قرمز' }, { title: 'نارنجی' }];

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<FiltersService>(FiltersService);
  });

  afterAll(async () => {
    await service.remove(filter_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ title, type, details });

    if (result instanceof CustomException) throw result;

    filter_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });
});
