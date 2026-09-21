import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { AddressController } from './address.controller';

describe('Test ( Address ) Controller', () => {
  let module: TestingModule;
  let controller: AddressController;

  let address_id: string;

  const user_id = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const role: string = '70591627-7622-4d8d-9d3c-9b8a6c09eeb4';

  const address: string = 'خوی 45 متری سیستانی زاده کوچه پردیس پردیس 2';
  const alley: string = 'پردیس 2';
  const city: string = 'خوی';
  const postal_code: string = '12345678910';
  const province: string = 'آذربیجان غربی';
  const street: string = '45 متری سیستانی زاده';

  const req = { user: { user_id } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  afterAll(async () => {
    controller.remove({ id: user_id }, req);
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create(
        { street, province, city, postal_code, alley, address },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) address_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
