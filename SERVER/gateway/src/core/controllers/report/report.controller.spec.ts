import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ReportController } from './report.controller';
import { TargetController } from '../target/target.controller';

describe('Test ( Report ) Controller', () => {
  let module: TestingModule;
  let controller: ReportController;
  let targetController: TargetController;

  let report_id: string;
  let target: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const title: string = 'Unit Test';
  const description: string = 'unit test description';

  const answer = 'ok see you later';

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ReportController>(ReportController);
    targetController = module.get<TargetController>(TargetController);
  });

  afterAll(async () => {
    controller.remove({ id: report_id });
    targetController.remove({ id: target });
    await module.close();
  });

  it('Test ( Create Target ) Controller', async () => {
    const result = (await firstValueFrom(
      targetController.create({ title: 'unit test' }),
    )) as ResultInterface;

    if (result.status === 201) target = result.body.id;

    expect(result.status).toEqual(201);
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

    if (!report_id) {
      expect(result.error?.status).toEqual(404);
      return;
    }

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: report_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Target ) Controller', async () => {
    const result = (await firstValueFrom(
      targetController.remove({ id: target }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
