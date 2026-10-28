import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { CustomProductEntity } from '../../../entities/custom-product.entity';
import { GetAllCustomProductsRequest } from './get-all-custom-products.request';

@Injectable()
export class GetAllCustomProductsHandler {
  async execute(query: GetAllCustomProductsRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await CustomProductEntity.findAndCount({
      relations: { carMake: true, carModel: true, model: true }, order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
