import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ReviewModel } from './review.model/review.model';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {
    console.info(dto);
  }

  @HttpCode(200)
  @Delete(':productId')
  async delete(@Param('productId') productId: string) {
    console.info(productId);
  }

  @HttpCode(200)
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    console.info(productId);
  }
}
