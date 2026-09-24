import { Test, TestingModule } from '@nestjs/testing';
import { SpecificationController } from './specification.controller';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Specification ) Controller', () => {
  let module: TestingModule;
  let controller: SpecificationController;

  let specification_id: string;

  const title: string = `Unit Test ${crypto.randomUUID()} Specification`;
  const details = [
    {
      title: crypto.randomUUID(),
      details: [
        {
          title: crypto.randomUUID(),
          value: crypto.randomUUID(),
        },
      ],
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

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findOne({ id: specification_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = await controller.remove({ id: specification_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
