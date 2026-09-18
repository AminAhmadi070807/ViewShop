import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CommentController } from './comment.controller';

describe('Test ( Comment ) Controller', () => {
  let module: TestingModule;
  let controller: CommentController;

  let comment_id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  afterAll(async () => {
    await controller.remove({ id: comment_id });
    await module.close();
  });
});
