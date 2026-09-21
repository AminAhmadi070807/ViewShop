import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom } from 'rxjs';
import { ColorController } from './color.controller';
import { AppModule } from '../../../app.module';
import { ResultInterface } from '../../../common/interface/result.interface';

describe('Test ( Color ) Controller', () => {
  let module: TestingModule;
  let controller: ColorController;

  let color_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';

  const color: string = '#23f6f8';
  const title: string = 'شامپونزه ای';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ColorController>(ColorController);
  });

  afterAll(async () => {
    controller.remove({ id: color_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ title, color }),
    )) as ResultInterface;

    if (result.status === 201) color_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(201);
  });
});
