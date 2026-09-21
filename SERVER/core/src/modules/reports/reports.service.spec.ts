import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { ReportsService } from './reports.service';
import { TargetService } from '../target/target.service';

describe('Test ( Report ) Service', () => {
  let module: TestingModule;
  let service: ReportsService;
  let targetService: TargetService;

  let report_id: string;
  let target: string;

  const title: string = 'Unit Test';
  const description: string = 'unit test description';
  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';

  const answer = 'ok see you later';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<ReportsService>(ReportsService);
    targetService = module.get<TargetService>(TargetService);
  });

  afterAll(async () => {
    await service.remove(report_id);
    await module.close();
  });

  it('Test ( Create Target ) Controller', async () => {
    const result = await targetService.create({ title });

    if (result instanceof CustomException) throw result;

    target = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await service.create({ title, description, target, user });

    if (result instanceof CustomException) throw result;

    report_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await service.findOne({ id: report_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Answer ) Controller', async () => {
    const result = await service.answer({ id: report_id, answer, user });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await service.remove(report_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Target ) Controller', async () => {
    const result = await targetService.remove(target);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
