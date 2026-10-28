import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { BannerEntity } from '../../../entities/banner.entity';
import { GetAllBannersRequest } from './get-all-banners.request';

@Injectable()
export class GetAllBannersHandler {
  async execute(query: GetAllBannersRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await BannerEntity.findAndCount({
      order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
