import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { ProductImageEntity } from '../../../entities/product-image.entity';
import { GetAllProductImagesRequest } from './get-all-product-images.request';

@Injectable()
export class GetAllProductImagesHandler {
  async execute(query: GetAllProductImagesRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await ProductImageEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
