import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { TargetController } from '../target/target.controller';

describe('Test ( Report ) Controller', () => {
  let module: TestingModule;
  let controller: ReportsController;
  let targetController: TargetController;

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

    controller = module.get<ReportsController>(ReportsController);
    targetController = module.get<TargetController>(TargetController);
  });

  afterAll(async () => {
    await controller.remove({ id: report_id });
    await targetController.remove({ id: target });
    await module.close();
  });

  it('Test ( Create Target ) Controller', async () => {
    const result = await targetController.create({ title });

    if (result instanceof CustomException) throw result;

    target = result.body.id;

    expect(result.status).toEqual(201);
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

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: report_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Answer ) Controller', async () => {
    const result = await controller.answer({ id: report_id, answer, user });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: report_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Target ) Controller', async () => {
    const result = await targetController.remove({ id: target });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
