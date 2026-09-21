import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { TicketController } from './ticket.controller';
import { TicketsDepartmentEnum } from '../../../common/enums/core/tickets/tickets.enum';

describe('Test ( Ticket ) Controller', () => {
  let module: TestingModule;
  let controller: TicketController;

  let ticket_id: string;
  const user = '1c4b85ac-f889-4396-a98c-803e531037af';

  const title = 'unit test';
  const description = 'test description';
  const department = TicketsDepartmentEnum.SUPPORT;

  const req = { user: { userId: user, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<TicketController>(TicketController);
  });

  afterAll(async () => {
    controller.remove({ id: ticket_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
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
});
