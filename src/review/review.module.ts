import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.model/review.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
