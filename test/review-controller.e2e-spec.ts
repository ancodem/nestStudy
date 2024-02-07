import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();

const createReviewDto: CreateReviewDto = {
  name: 'name',
  title: 'title',
  description: 'description',
  rating: 5,
  productId,
};

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - success', async () => {
    const { body, statusCode } = await request(app.getHttpServer())
      .post('/review/create')
      .send(createReviewDto);

    createdId = body._id;

    expect(createdId).toBeDefined();
    expect(statusCode).toBe(201);
  });

  it('/review/create (POST) - fail with rating 0', async () => {
    const { statusCode } = await request(app.getHttpServer())
      .post('/review/create')
      .send({ ...createReviewDto, rating: 0 });

    expect(statusCode).toBe(400);
  });

  it('/review/create (POST) - fail with rating 6', async () => {
    const { statusCode } = await request(app.getHttpServer())
      .post('/review/create')
      .send({ ...createReviewDto, rating: 6 });

    expect(statusCode).toBe(400);
  });

  it('/review/byProduct/:id (GET) - success', async () => {
    const { statusCode, body } = await request(app.getHttpServer()).get(
      '/review/byProduct/' + productId,
    );

    expect(body).toBeDefined();
    expect(body.length).toBe(1);

    expect(statusCode).toBe(200);
  });

  it('/review/byProduct/:id (GET) - fail', async () => {
    const { statusCode } = await request(app.getHttpServer()).get(
      '/review/byProduct/',
    );

    expect(statusCode).toBe(404);
  });

  it('/review (DELETE) - success', async () => {
    const { statusCode, body } = await request(app.getHttpServer()).delete(
      '/review/' + createdId,
    );

    expect(statusCode).toBe(200);
    expect(body.productId).toBe(productId);
  });

  it('/review/byProduct/:id (GET) - fail', async () => {
    const { statusCode, body } = await request(app.getHttpServer()).get(
      '/review/byProduct/' + productId,
    );

    expect(body.message).toBe('ревью не существует');
    expect(statusCode).toBe(404);
  });
});

afterAll(() => {
  disconnect();
});
