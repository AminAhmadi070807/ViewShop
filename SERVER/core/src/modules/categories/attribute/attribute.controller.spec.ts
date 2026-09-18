import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { AttributeController } from './attribute.controller';
import { CustomException } from '../../../common/exceptions/custom.exception.error';

describe('Test ( Attribute ) Controller', () => {
  let module: TestingModule;
  let controller: AttributeController;

  let attribute_id: string;

  const title: string = 'Unit Test';
  const alias: string = 'Unit-Test';
  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const subCategory: string = 'e11cf198-443d-48ba-93c9-25750fc80fb2';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<AttributeController>(AttributeController);
  });

  afterAll(async () => {
    await controller.remove({ id: attribute_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = await controller.create({
      alias,
      user,
      title,
      icon,
      subCategory,
    });

    if (result instanceof CustomException) throw result;

    attribute_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
