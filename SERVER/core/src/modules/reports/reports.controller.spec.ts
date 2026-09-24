import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { TargetController } from '../target/target.controller';
import { randomInt } from 'node:crypto';
import { UsersController } from '../users/users.controller';

describe('Test ( Report ) Controller', () => {
  let module: TestingModule;
  let controller: ReportsController;
  let targetController: TargetController;
  let usersController: UsersController;

  let report_id: string;
  let user_id: string;
  let target: string;

  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const description: string = 'unit test description';

  const answer = 'ok see you later';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ReportsController>(ReportsController);
    targetController = module.get<TargetController>(TargetController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await controller.remove({ id: report_id });
    await targetController.remove({ id: target });
    await module.close();
  });

  it('Test ( Create User ) Feature', async () => {
    const result = await usersController.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Target ) Controller', async () => {
    const result = await targetController.create({
      title: crypto.randomUUID(),
    });

    if (result instanceof CustomException) throw result;

    target = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      title,
      description,
      target,
      user: user_id,
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
    const result = await controller.answer({
      id: report_id,
      answer,
      user: user_id,
    });

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

  it('Test ( Delete User ) Feature', async () => {
    const result = await usersController.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
