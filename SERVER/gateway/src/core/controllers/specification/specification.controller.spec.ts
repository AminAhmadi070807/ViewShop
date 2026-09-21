import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { SpecificationController } from './specification.controller';

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
    controller.remove({ id: specification_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title, details }),
    )) as ResultInterface;

    if (result.status === 201) specification_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
