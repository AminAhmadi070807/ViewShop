import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CommentController } from './comment.controller';
import { CustomException } from '../../common/exceptions/custom.exception.error';

describe('Test ( Comment ) Service', () => {
  let module: TestingModule;
  let service: CommentController;

  let comment_id: string;
  let child_comment_id: string;

  const user: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const description: string = 'واقعا محصول خوبی بود';
  const score: number = 5;

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    service = module.get<CommentController>(CommentController);
  });

  afterAll(async () => {
    await service.remove({ id: comment_id });
    await service.remove({ id: child_comment_id });
    await module.close();
  });

  it('Test ( Create ) Feature', async () => {
    const result = await service.create({
      user,
      score,
      product,
      description,
    });

    if (result instanceof CustomException) throw result;

    comment_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( FindAll ) Feature', async () => {
    const result = await service.findAll({});

    expect(result.status).toBe(200);
  });

  it('Test ( FindProductComments ) Feature', async () => {
    const result = await service.findProductComments({ id: product });

    expect(result.status).toBe(200);
  });

  it('Test ( Update ) Feature', async () => {
    const result = await service.update({ id: comment_id, status: true });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

  it('Test ( Create Child Comment ) Feature', async () => {
    const result = await service.create({
      user,
      score,
      product,
      description,
      parentComment: comment_id,
    });

    if (result instanceof CustomException) throw result;

    child_comment_id = result.body.id;

    expect(result.status).toBe(201);
  });

  it('Test ( Update Child Comment ) Feature', async () => {
    const result = await service.update({
      id: child_comment_id,
      status: true,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

  it('Test ( Delete Child Comment ) Feature', async () => {
    const result = await service.remove({
      id: child_comment_id,
    });

    if (result instanceof CustomException) throw result;

    expect(result.status).toBe(204);
  });

});
