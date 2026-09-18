import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { AttributeController } from './attribute.controller';

describe('Test ( Attribute ) Controller', () => {
  let module: TestingModule;
  let controller: AttributeController;

  let attribute_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AttributeController>(AttributeController);
  });

  afterAll(async () => {
    await controller.remove({ id: attribute_id });
    await module.close();
  });
});
