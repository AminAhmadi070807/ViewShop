import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { TicketController } from './ticket.controller';
import { TicketsDepartmentEnum } from '../../../common/enums/core/tickets/tickets.enum';
import { UsersController } from '../users/user.controller';
import { randomInt } from 'node:crypto';

describe('Test ( Ticket ) Controller', () => {
  let module: TestingModule;
  let controller: TicketController;
  let usersController: UsersController;

  let ticket_id: string;
  let user_id: string;

  const title = `unit ${crypto.randomUUID()} test`;
  const description = `test ${crypto.randomUUID()} description`;
  const department = TicketsDepartmentEnum.SUPPORT;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<TicketController>(TicketController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    controller.remove({ id: ticket_id });
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

  it('Test ( Create ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.create({ title, description, department }, req),
    )) as ResultInterface;

    if (result.status === 201) ticket_id = result.body.id;

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
      controller.findOne({ id: ticket_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const req = { user: { userId: user_id, role: 'ADMIN' } };

    const result = (await firstValueFrom(
      controller.update({ id: ticket_id, description }, req),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: ticket_id }),
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
