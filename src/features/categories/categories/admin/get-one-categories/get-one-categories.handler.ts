import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from '../../../entities/category.entity';

@Injectable()
export class GetOneCategoriesHandler {
  async execute(id: number) {
    const item = await CategoryEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Categories not found');
    return item;
  }
}
