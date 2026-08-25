import { PartialType } from '@nestjs/mapped-types';
import { CreateTennisCategoryDto } from './create-tennis-category.dto';

export class UpdateTennisCategoryDto extends PartialType(CreateTennisCategoryDto) {}
