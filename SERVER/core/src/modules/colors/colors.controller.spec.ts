import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { ColorsController } from './colors.controller';

describe('Test ( Colors ) Controller', () => {
  let module: TestingModule;
  let controller: ColorsController;

  let color_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<ColorsController>(ColorsController);
  });

  afterAll(async () => {
    await controller.remove({ id: color_id });
    await module.close();
  });
});
