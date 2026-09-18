import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { ColorsService } from './colors.service';

describe('Test ( Colors ) Service', () => {
  let module: TestingModule;
  let service: ColorsService;

  let color_id: string;

  const color: string = '#23f6f8';
  const title: string = 'شامپونزه ای';

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<ColorsService>(ColorsService);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await service.remove(color_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ color, title });

    if (result instanceof CustomException) throw result;

    color_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toBe(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(color_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(200);
  });

  it('Test ( Search ) Feature', async () => {
    const result = await service.search(title);

    expect(result.status).toBe(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove(color_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });
});
