import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TennisCategoriesService } from '../services/tennis-categories.service';
import { CreateTennisCategoryDto } from '../dto/create-tennis-category.dto';
import { UpdateTennisCategoryDto } from '../dto/update-tennis-category.dto';

@Controller('tennis-categories')
export class TennisCategoriesController {
  constructor(private readonly tennisCategoriesService: TennisCategoriesService) {}

  @Post()
  create(@Body() createTennisCategoryDto: CreateTennisCategoryDto) {
    return this.tennisCategoriesService.create(createTennisCategoryDto);
  }

  @Get()
  findAll() {
    return this.tennisCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tennisCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTennisCategoryDto: UpdateTennisCategoryDto) {
    return this.tennisCategoriesService.update(+id, updateTennisCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tennisCategoriesService.remove(+id);
  }
}
