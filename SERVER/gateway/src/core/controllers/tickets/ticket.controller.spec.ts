import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { TicketController } from './ticket.controller';

describe('Test ( Ticket ) Controller', () => {
  let module: TestingModule;
  let controller: TicketController;

  let ticket_id: string;

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
});
