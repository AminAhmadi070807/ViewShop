import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomException } from '../../common/exceptions/custom.exception.error';
import { AddressesService } from './addresses.service';

describe('Test ( Addresses ) Controller', () => {
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
});
