import { Injectable } from '@nestjs/common';
import { CreateTennisCategoryDto } from '../dto/create-tennis-category.dto';
import { UpdateTennisCategoryDto } from '../dto/update-tennis-category.dto';

@Injectable()
export class TennisCategoriesService {
  create(createTennisCategoryDto: CreateTennisCategoryDto) {
    return 'This action adds a new tennisCategory';
  }

  findAll() {
    return `This action returns all tennisCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tennisCategory`;
  }

  update(id: number, updateTennisCategoryDto: UpdateTennisCategoryDto) {
    return `This action updates a #${id} tennisCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} tennisCategory`;
  }
}
