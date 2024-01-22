import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ReviewController],
})
export class ReviewModule { }
