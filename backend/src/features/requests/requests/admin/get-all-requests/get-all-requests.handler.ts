import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { RequestEntity } from '../../../entities/request.entity';
import { GetAllRequestsRequest } from './get-all-requests.request';

@Injectable()
export class GetAllRequestsHandler {
  async execute(query: GetAllRequestsRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await RequestEntity.findAndCount({
      relations: { user: true }, order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
