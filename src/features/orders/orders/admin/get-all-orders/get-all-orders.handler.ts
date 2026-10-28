import { Injectable } from '@nestjs/common';
import { paginate } from '../../../../common/dto/paginated-result.dto';
import { OrderEntity } from '../../../entities/order.entity';
import { GetAllOrdersRequest } from './get-all-orders.request';

@Injectable()
export class GetAllOrdersHandler {
  async execute(query: GetAllOrdersRequest) {
    const page = query.page ?? 1;
    const size = query.size ?? 20;
    const [data, total] = await OrderEntity.findAndCount({
      relations: { items: { product: true }, branch: true, user: true }, order: { id: 'DESC' },
      take: size,
      skip: (page - 1) * size,
    });
    return paginate(data, total, page, size);
  }
}
