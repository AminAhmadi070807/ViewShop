import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { CustomException } from '../../../common/exceptions/custom.exception.error';
import { AttributeService } from './attribute.service';

describe('Test ( Attribute ) Service', () => {
  let module: TestingModule;
  let service: AttributeService;

  let attribute_id: string;

  const title: string = 'Unit Test';
  const alias: string = 'Unit-Test';
  const user: string = '1c4b85ac-f889-4396-a98c-803e531037af';
  const icon: string = 'e6186e53-0325-47d5-ad9d-73296a9a25bf';
  const subCategory: string = 'e11cf198-443d-48ba-93c9-25750fc80fb2';

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<AttributeService>(AttributeService);
  });

  afterAll(async () => {
    await service.remove(attribute_id);
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
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

  it('Test ( FindAll ) Controller', async () => {
    const result = await service.findAll();

    expect(result.status).toEqual(200);
  });
});
