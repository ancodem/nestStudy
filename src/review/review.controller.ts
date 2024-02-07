import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { Review } from './model/review.model';
import { IsString } from 'class-validator';

@Controller('review')
export class ReviewController {
  constructor(
    private configService: ConfigService,
    private reviewService: ReviewService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe()) // automatically validates the value based on the class-validation instructions provided in CreateReviewDto
  @HttpCode(200)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Review | never> {
    const deleted = await this.reviewService.delete(id);

    if (!deleted) {
      throw new HttpException('отзыв не существует', HttpStatus.NOT_FOUND);
    }

    return deleted;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
  ): Promise<Review[] | never> {
    if (!productId) {
      throw new HttpException('де айди?', HttpStatus.NOT_FOUND);
    }

    const reviews = await this.reviewService.findByProductId(productId);

    if (!reviews.length) {
      throw new HttpException('ревью не существует', HttpStatus.NOT_FOUND);
    }

    return reviews;
  }
}
