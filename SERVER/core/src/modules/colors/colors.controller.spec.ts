import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ColorsController } from './colors.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { randomInt } from 'crypto';

describe('Test ( Colors ) Controller', () => {
  let module: TestingModule;
  let controller: ColorsController;

  let color_id: string;

  beforeEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ColorsController>(ColorsController);
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await controller.remove({ id: color_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      color: `#23f${randomInt(100, 999)}`,
      title: `شامپونزه ای ${randomInt(100, 999)}`,
    });

    if (result instanceof CustomException) throw result;

    color_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({});

    expect(result.status).toBe(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: color_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(200);
  });

  it('Test ( Search ) Controller', async () => {
    const result = await controller.search({
      title: `شامپونزه ای ${randomInt(100, 999)}`,
    });

    expect(result.status).toBe(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: color_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });
});
