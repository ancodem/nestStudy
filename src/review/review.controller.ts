import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { Review } from './review.model/review.model';
import { ConfigService } from '@nestjs/config';

@Controller('review')
export class ReviewController {
  constructor(private configService: ConfigService) {}

  @Post('create')
  async create(@Body() dto: Review) {
    console.info(dto);
  }

  @HttpCode(200)
  @Delete('/:productId')
  async delete(@Param('productId') productId: string) {
    console.log(productId);
    return this.configService.get('TEST');
  }

  @HttpCode(200)
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    console.info(productId);
  }
}
