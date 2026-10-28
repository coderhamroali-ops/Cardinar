import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderEntity } from '../../../entities/order.entity';

@Injectable()
export class DeleteOrdersHandler {
  async execute(id: number) {
    const item = await OrderEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Orders not found');
    await item.remove();
    return { id };
  }
}
