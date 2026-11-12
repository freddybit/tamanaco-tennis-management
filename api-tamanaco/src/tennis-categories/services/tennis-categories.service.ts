import { Injectable } from '@nestjs/common';
import { CreateTennisCategoryDto } from '../dto/create-tennis-category.dto';
import { UpdateTennisCategoryDto } from '../dto/update-tennis-category.dto';
import { TennisCategoryRepository } from '../repositories/tennis-category.repository';
import { TennisCategory } from '../entities/tennis-category.entity';

@Injectable()
export class TennisCategoriesService {
  
  private tennisCategoriesRepository: TennisCategoryRepository;

  constructor(tennisCategoriesRepository: TennisCategoryRepository) {
    this.tennisCategoriesRepository = tennisCategoriesRepository;
  }

  async create(createTennisCategoryDto: CreateTennisCategoryDto) {
    const newTennisCategory = new TennisCategory({
      categoryName: createTennisCategoryDto.categoryName,
      description: createTennisCategoryDto.description || null,
      type: createTennisCategoryDto.type || null,
      ranking_rankingKey: createTennisCategoryDto.ranking_rankingKey,
      playerTennisCategories: [],
      tournaments: [],
    });

    await this.tennisCategoriesRepository.create(newTennisCategory);
    return newTennisCategory;
  }

  async findAll() {
    const tennisCategories = await this.tennisCategoriesRepository.findAll();
    return tennisCategories;
  }

  async findOne(catKey: number) {
    const tennisCategory = await this.tennisCategoriesRepository.findById(catKey);
    return tennisCategory;
  }

  async update(catKey: number, updateTennisCategoryDto: UpdateTennisCategoryDto) {
    const tennisCategory = await this.tennisCategoriesRepository.findById(catKey);
    if (!tennisCategory) {
      throw new Error(`Tennis category with key ${catKey} not found`);
    }
    const updatedTennisCategory = Object.assign(tennisCategory, updateTennisCategoryDto);
    await this.tennisCategoriesRepository.update(updatedTennisCategory);
    return updatedTennisCategory;
  }

  async remove(catKey: number) {
    const tennisCategory = await this.tennisCategoriesRepository.findById(catKey);
    if (!tennisCategory) {
      throw new Error(`Tennis category with key ${catKey} not found`);
    }
    await this.tennisCategoriesRepository.remove(catKey);
    return { message: `Tennis category with key ${catKey} has been removed` };
  }
  
}