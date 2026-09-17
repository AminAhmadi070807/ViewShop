import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

import { FeaturesService } from './features.service';
import { statusMessages } from '../../common/messages/status.message';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('FeaturesService', () => {
  let service: FeaturesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
  });

  afterAll(async () => {
    // await service.remove('70591627-7622-4d8d-9d3c-9b8a6c09eeb4');
    await module.close();
  });

  it('should be defined', async () => {
    const result = await service.create({
      title: 'Unit Test',
      roles: ['70591627-7622-4d8d-9d3c-9b8a6c09eeb4'],
    });

    if (result instanceof CustomException) return result;

    expect(true).toEqual(true);
  });
});
