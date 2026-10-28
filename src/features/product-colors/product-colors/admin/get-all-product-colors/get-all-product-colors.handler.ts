import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { ProductColorEntity } from '../../../entities/product-color.entity';
import { GetAllProductColorsRequest } from './get-all-product-colors.request';

@Injectable()
export class GetAllProductColorsHandler {
  async execute(query: GetAllProductColorsRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await ProductColorEntity.findAndCount({
      relations: { color: true }, order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
