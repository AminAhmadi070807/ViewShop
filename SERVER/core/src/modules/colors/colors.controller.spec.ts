import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ColorsController } from './colors.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Colors ) Controller', () => {
  let module: TestingModule;
  let controller: ColorsController;

  let color_id: string;

  const color: string = '#23f6f8';
  const title: string = 'شامپونزه ای';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ColorsController>(ColorsController);
  });

  afterAll(async () => {
    await controller.remove({ id: color_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ color, title });

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
    const result = await controller.search({ title });

    expect(result.status).toBe(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: color_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(200);
  });
});
