import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from './model/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    const newReview = new this.reviewModel(dto);
    return newReview.save();
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(id: string): Promise<Review[] | null> {
    return this.reviewModel.find({ productId: id }).exec();
  }

  async deleteByProductid(id: string): Promise<{ deletedCount: number }> {
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(id) })
      .exec();
  }

  async getAllReviews() {
    return this.reviewModel.find().exec();
  }
}
