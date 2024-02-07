import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

describe('ReviewService', () => {
  const productId = new mongoose.Types.ObjectId().toHexString();
  let service: ReviewService;
  const exec = { exec: jest.fn() };
  const createServiceFactory = () => ({
    find: () => exec,
    save: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: createServiceFactory,
          provide: getModelToken('Review'),
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const createDto: CreateReviewDto = {
      name: 'test',
      title: 'test',
      description: '',
      rating: 2,
      productId,
    };

    createServiceFactory().save()
      .mockReturnValueOnce([createDto]);

    const res = await service.findByProductId(productId);

    expect(res).toEqual(createDto);
  });

  it('find by product id', async () => {
    createServiceFactory().find().exec = jest
      .fn()
      .mockReturnValueOnce([{ productId }]);

    const res = await service.findByProductId(productId);

    expect(res.length).toBe(1);
    expect(res[0].productId).toBe(productId);
  });
});
