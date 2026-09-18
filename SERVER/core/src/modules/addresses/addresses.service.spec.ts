import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { AddressesService } from './addresses.service';

describe('Test ( Addresses ) Service', () => {
  let service: AddressesService;
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

    service = module.get<AddressesService>(AddressesService);
  });

  afterAll(async () => {
    await service.remove({ id: address_id, user: user_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll({ id: user_id, user: user_id });

    expect(result.status).toEqual(200);
  });

  it('Test ( FindOne ) Feature', async () => {
    const result = await service.findOne({ id: address_id, user: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(200);
  });

  it('Test ( Delete ) Feature', async () => {
    const result = await service.remove({ id: address_id, user: user_id });

    if (result instanceof CustomException) throw result;

    expect(result.status).toEqual(204);
  });
});
