import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { OrderEntity } from '../../../entities/order.entity';
import { UpdateOrdersRequest } from './update-orders.request';

@Injectable()
export class UpdateOrdersHandler {
  async execute(id: number, payload: UpdateOrdersRequest) {
    const item = await OrderEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Orders not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
