import { AddressesController } from './addresses.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Addresses ) Controller', () => {
  let controller: AddressesController;
  let module: TestingModule;

  let address_id: string;

  const user_id: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const address: string = 'خوی 45 متری سیستانی زاده کوچه پردیس پردیس 2';
  const alley: string = 'پردیس 2';
  const city: string = 'خوی';
  const postal_code: string = '12345678910';
  const province: string = 'آذربیجان غربی';
  const street: string = '45 متری سیستانی زاده';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  afterAll(async () => {
    await controller.remove({ id: address_id, user: user_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      address,
      user: user_id,
      alley,
      city,
      postal_code,
      province,
      street,
    });

    if (result instanceof CustomException) throw result;

    address_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = await controller.findAll({ id: user_id, user: user_id });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Controller', async () => {
    const result = await controller.findAll({ id: address_id, user: user_id });

    expect(result.status).toEqual(200);
  });
});
