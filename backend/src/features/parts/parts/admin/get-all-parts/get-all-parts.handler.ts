import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { PartEntity } from '../../../entities/part.entity';
import { GetAllPartsRequest } from './get-all-parts.request';

@Injectable()
export class GetAllPartsHandler {
  async execute(query: GetAllPartsRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await PartEntity.findAndCount({
      relations: { material: true, color: true }, order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
