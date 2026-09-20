import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { TargetController } from './target.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { TargetService } from './target.service';

describe('Test ( Store ) Service', () => {
  let module: TestingModule;
  let service: TargetService;

  let target_id: string;

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<TargetService>(TargetService);
  });

  afterAll(async () => {
    await service.remove(target_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ title: 'Unit Test' });

    if (result instanceof CustomException) throw result;

    target_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(target_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({
      id: target_id,
      title: 'New Test',
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
