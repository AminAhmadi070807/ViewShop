import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { SpecificationService } from './specification.service';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Specification ) Service ', () => {
  let module: TestingModule;
  let service: SpecificationService;

  let specification_id: string;

  const title: string = 'Unit Test Specification';
  const details = [
    {
      title: 'unit test 1',
      details: [{ title: 'unit test', value: 'unit test' }],
    },
  ];

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<SpecificationService>(SpecificationService);
  });

  afterAll(async () => {
    await service.remove(specification_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({ title, details });

    specification_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne(specification_id);

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });
});
