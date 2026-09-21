import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { TargetController } from './target.controller';

describe('Test ( Target ) Controller', () => {
  let module: TestingModule;
  let controller: TargetController;

  let target_id: string;

  const title = 'unit test';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<TargetController>(TargetController);
  });

  afterAll(async () => {
    controller.remove({ id: target_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title }),
    )) as ResultInterface;

    if (result.status === 201) target_id = result.body.id;

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
      controller.findOne({ id: target_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: target_id, title }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
