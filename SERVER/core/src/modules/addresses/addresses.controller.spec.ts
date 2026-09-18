import { AddressesController } from './addresses.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

describe('Test ( Addresses ) Controller', () => {
  let controller: AddressesController;
  let module: TestingModule;

  let address_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  afterAll(async () => {
    await controller.remove({ id: address_id });
    await module.close();
  });
});
