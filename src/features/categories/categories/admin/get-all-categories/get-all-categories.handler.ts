import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { CategoryEntity } from '../../../entities/category.entity';
import { GetAllCategoriesRequest } from './get-all-categories.request';

@Injectable()
export class GetAllCategoriesHandler {
  async execute(query: GetAllCategoriesRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await CategoryEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
