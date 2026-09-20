import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationController } from './specification.controller';
import { AppModule } from '../../app.module';

describe('Test ( Specification ) Controller', () => {
  let module: TestingModule;
  let controller: SpecificationController;

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

    controller = module.get<SpecificationController>(SpecificationController);
  });

  afterAll(async () => {
    await controller.remove({ id: specification_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({ title, details });

    specification_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll();

    expect(result.status).toEqual(200);
  });
});
