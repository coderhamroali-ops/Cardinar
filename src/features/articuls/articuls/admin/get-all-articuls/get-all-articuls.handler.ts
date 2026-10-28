import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { ArticulEntity } from '../../../entities/articul.entity';
import { GetAllArticulsRequest } from './get-all-articuls.request';

@Injectable()
export class GetAllArticulsHandler {
  async execute(query: GetAllArticulsRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await ArticulEntity.findAndCount({
      relations: { product: true, carModel: true }, order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
