import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

import { FeaturesService } from './features.service';
import { statusMessages } from '../../common/messages/status.message';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('FeaturesService', () => {
  let service: FeaturesService;
  let module: TestingModule;
  let feature_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
  });

  afterAll(async () => {
    await service.remove(feature_id);
    await module.close();
  });

  it('should be defined', async () => {
    const result = await service.create({
      title: 'Unit Test',
      roles: ['70591627-7622-4d8d-9d3c-9b8a6c09eeb4'],
    });

    if (result instanceof CustomException) return new Error(result.message);

    feature_id = result.body.id;

    expect(result.status).toEqual(201);
  });
});
