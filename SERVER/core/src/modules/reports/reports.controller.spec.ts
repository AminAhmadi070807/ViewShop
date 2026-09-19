import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Report ) Controller', () => {
  let module: TestingModule;
  let controller: ReportsController;

  let report_id: string;

  const title: string = 'Unit Test';
  const description: string = 'unit test description';
  const target: string = 'aa3d8798-06ef-445d-8781-2df58cba302b';
  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  afterAll(async () => {
    await controller.remove({ id: report_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      title,
      description,
      target,
      user,
    });

    if (result instanceof CustomException) throw result;

    report_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });
});
