import {
  Controller,
  Post,
  Body,
  HttpCode,
  Delete,
  Patch,
  Get,
  Param,
} from '@nestjs/common';
import { TopPage } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: TopPage) {
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
  async patch(@Param('id') id: string, @Body() dto: TopPage) {
    console.info(id, dto);
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    console.info(dto);
  }
}
