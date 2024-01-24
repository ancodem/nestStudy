import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { Product } from './product.model/product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Product) {
    console.info(dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.info(id);
  }

  @HttpCode(200)
  @Get(':id')
  async get(@Param('id') id: string) {
    console.info(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Product) {
    console.info(id, dto);
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    console.info(dto);
  }
}
