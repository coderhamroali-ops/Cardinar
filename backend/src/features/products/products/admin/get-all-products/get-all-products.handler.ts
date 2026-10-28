import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { ProductEntity } from '../../../entities/product.entity';
import { GetAllProductsRequest } from './get-all-products.request';

@Injectable()
export class GetAllProductsHandler {
  async execute(query: GetAllProductsRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await ProductEntity.findAndCount({
      relations: { category: true, images: true }, order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
