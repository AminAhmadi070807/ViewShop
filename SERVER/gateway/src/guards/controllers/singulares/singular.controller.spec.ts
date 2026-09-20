import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { SingularController } from './singular.controller';

describe('Test ( Singular ) Controller', () => {
  let module: TestingModule;
  let controller: SingularController;

  let singular_id: string;

  const permission: string = '1acf6d34-45a2-484e-8c0b-03ac544f660e';
  const feature: string = '8e566a93-4cfb-473c-9ac1-68c8efa22824';
  const role: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<SingularController>(SingularController);
  });

  afterAll(async () => {
    controller.remove({ id: singular_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({
        data: [{ role, permissions: [permission] }],
        feature,
      }),
    )) as ResultInterface;

    if (result.status === 201) singular_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Toggle Access ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.toggleAccess({ role, permission, id: singular_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: singular_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
