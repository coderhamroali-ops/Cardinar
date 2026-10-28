import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../../entities/order.entity';

// "История заказов": har bir buyurtma umumiy summasi bilan
@Injectable()
export class GetMyOrdersHandler {
  async execute(userId: number) {
    const orders = await OrderEntity.find({
      where: { userId },
      relations: { items: { product: { category: true } }, branch: true },
      order: { id: 'DESC' },
    });
    return orders.map((order) => ({
      ...order,
      total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }));
  }
}
