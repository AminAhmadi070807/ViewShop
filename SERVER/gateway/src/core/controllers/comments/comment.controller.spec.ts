import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { firstValueFrom } from 'rxjs';
import { ResultInterface } from '../../../common/interface/result.interface';
import { CommentController } from './comment.controller';

describe('Test ( Comment ) Controller', () => {
  let module: TestingModule;
  let controller: CommentController;

  let comment_id: string;
  let child_comment_id: string;

  const user_id: string = '70ffcfcf-baab-4937-8269-2d80574dab56';
  const product: string = '3f5464f8-8d52-41df-8654-2da3fea81df0';
  const description: string = 'واقعا محصول خوبی بود';
  const score: number = 5;

  const req = { user: { userId: user_id, role: 'ADMIN' } };

  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  beforeAll(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  afterAll(async () => {
    controller.remove({ id: comment_id });
    controller.remove({ id: child_comment_id });
    await module.close();
  });

  it('Test ( Create ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create({ product, score, description }, req),
    )) as ResultInterface;

    if (result.status === 201) comment_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( FindAll ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findAll(),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Find Product Comment ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.findProductComments({ id: product }),
    )) as ResultInterface;

    expect(result.status).toEqual(200);
  });

  it('Test ( Update ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update({ id: product, status: true }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Create Child Comment ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.create(
        { product, score, description, parentComment: comment_id },
        req,
      ),
    )) as ResultInterface;

    if (result.status === 201) child_comment_id = result.body.id;

    expect(result.status).toEqual(201);
  });

  it('Test ( Update Child Comment ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.update(
        {
          product,
          score,
          description,
          parentComment: comment_id,
          status: true,
          id: child_comment_id,
        },
        req,
      ),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });

  it('Test ( Delete Child Comment ) Controller', async () => {
    const result = (await firstValueFrom(
      controller.remove({ id: child_comment_id }),
    )) as ResultInterface;

    expect(result.status).toEqual(204);
  });
});
