import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ReportController } from './report.controller';
describe('Test ( Product ) Controller', () => {
  let module: TestingModule;
  let controller: ReportController;

  let report_id: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const title: string = 'Unit Test';
  const description: string = 'unit test description';
  const target: string = 'aa3d8798-06ef-445d-8781-2df58cba302b';

  const answer = 'ok see you later';

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  afterAll(async () => {
    controller.remove({ id: report_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ description, target, title }, req),
    )) as ResultInterface;

    if (result.status === 201) report_id = result.body.id;

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
      controller.findOne({ id: report_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Answer ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.answer({ id: report_id, answer }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
