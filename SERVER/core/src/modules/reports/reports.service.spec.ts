import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { ReportsService } from './reports.service';
import { TargetService } from '../target/target.service';
import { UsersService } from '../users/users.service';
import { randomInt } from 'node:crypto';

describe('Test ( Report ) Service', () => {
  let module: TestingModule;
  let service: ReportsService;
  let targetService: TargetService;
  let usersService: UsersService;

  let report_id: string;
  let target: string;
  let user_id: string;

  const title: string = `Unit ${crypto.randomUUID()} Test`;
  const description: string = 'unit test description';

  const answer = 'ok see you later';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<ReportsService>(ReportsService);
    targetService = module.get<TargetService>(TargetService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await service.remove(report_id);
    await module.close();
  });

  it('Test ( Create User ) Feature', async () => {
    const result = await usersService.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create Target ) Feature', async () => {
    const result = await targetService.create({ title: crypto.randomUUID() });

    if (result instanceof CustomException) throw result;

    target = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      title,
      description,
      target,
      user: user_id,
    });

    if (result instanceof CustomException) throw result;

    report_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne({ id: report_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Answer ) Feature', async () => {
    const result = await service.answer({
      id: report_id,
      answer,
      user: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(report_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Target ) Feature', async () => {
    const result = await targetService.remove(target);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Feature', async () => {
    const result = await usersService.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
