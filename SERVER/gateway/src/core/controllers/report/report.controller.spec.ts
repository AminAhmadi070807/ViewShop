import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { ReportController } from './report.controller';
import { TargetController } from '../target/target.controller';
import { UsersController } from '../users/user.controller';
import { randomInt } from 'node:crypto';

describe('Test ( Report ) Controller', () => {
  let module: TestingModule;
  let controller: ReportController;
  let targetController: TargetController;
  let usersController: UsersController;

  let report_id: string;
  let target: string;
  let user_id: string;

  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const description: string = `unit ${crypto.randomUUID()} test description`;

  const answer = 'ok see you later';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ReportController>(ReportController);
    targetController = module.get<TargetController>(TargetController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    controller.remove({ id: report_id });
    targetController.remove({ id: target });
    usersController.remove({ id: user_id });

    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.create({
        fullName: 'کاربر تستی',
        password: '00000000',
        phone: `0914${randomInt(1_000_000, 9_999_999)}`,
      }),
    )) as ResultInterface;

    if (result.status === 201) user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Target ) Controller', async () => {
    const result = (await firstValueFrom(
      targetController.create({ title: 'unit test' }),
    )) as ResultInterface;

    if (result.status === 201) target = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

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
    const req = { user: { userId: user_id, role: 'ADMIN' } };

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

  it('Test ( Delete User ) Controller', async () => {
    const result = (await firstValueFrom(
      usersController.remove({ id: user_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
