import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { TargetController } from './target.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Store ) Controller', () => {
  let module: TestingModule;
  let controller: TargetController;

  let target_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<TargetController>(TargetController);
  });

  afterAll(async () => {
    await controller.remove({ id: target_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ title: 'Unit Test' });

    if (result instanceof CustomException) throw result;

    target_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: target_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
