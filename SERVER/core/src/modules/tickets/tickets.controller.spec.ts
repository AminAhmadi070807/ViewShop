import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { TicketsController } from './tickets.controller';
import { TicketsDepartmentEnum } from '../../common/enums/tickets/tickets.enum';

describe('Test ( Tickets ) Controller', () => {
  let module: TestingModule;
  let controller: TicketsController;

  let ticket_id: string;

  const title = 'unit test';
  const user = '1c4b85ac-f889-4396-a98c-803e531037af';
  const description = 'test description';
  const department = TicketsDepartmentEnum.SUPPORT;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  afterAll(async () => {
    await controller.remove({ id: ticket_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await controller.create({
      user,
      title,
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

});
