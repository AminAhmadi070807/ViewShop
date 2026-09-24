import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { TicketsController } from './tickets.controller';
import { TicketsDepartmentEnum } from '../../common/enums/tickets/tickets.enum';
import { randomInt } from 'node:crypto';
import { UsersController } from '../users/users.controller';

describe('Test ( Tickets ) Controller', () => {
  let module: TestingModule;
  let controller: TicketsController;
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

    controller = module.get<TicketsController>(TicketsController);
    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await controller.remove({ id: ticket_id });
    await usersController.remove({ id: user_id });

    await module.close();
  });

  it('Test ( Create User ) Controller', async () => {
    const result = await usersController.create({
      phone: `0914${randomInt(1000000, 9999999)}`,
      password: '123456789',
      fullName: 'تست نام کاربری',
    });

    if (result instanceof CustomException) throw result;

    user_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Create ) Feature', async () => {
    const result = await controller.create({
      user: user_id,
      title: crypto.randomUUID(),
      department,
      description,
    });

    ticket_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await controller.findAll({});

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await controller.findOne({ id: ticket_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await controller.update({
      id: ticket_id,
      user: user_id,
      description,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await controller.remove({ id: ticket_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete User ) Controller', async () => {
    const result = await usersController.remove({
      id: user_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
