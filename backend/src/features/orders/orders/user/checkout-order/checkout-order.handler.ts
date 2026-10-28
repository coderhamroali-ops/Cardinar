import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStatus } from '../../../../../core/enum/enum';
import { BranchEntity } from '../../../../branches/entities/branch.entity';
import { CartItemEntity } from '../../../../cart/entities/cart-item.entity';
import { OrderItemEntity } from '../../../entities/order-item.entity';
import { OrderEntity } from '../../../entities/order.entity';
import { CheckoutOrderRequest } from './checkout-order.request';

// Savatdagi barcha mahsulotlardan buyurtma yaratadi va savatni tozalaydi (bitta tranzaksiyada)
@Injectable()
export class CheckoutOrderHandler {
  async execute(userId: number, payload: CheckoutOrderRequest) {
    const branch = await BranchEntity.findOneBy({ id: payload.branchId, isActive: true });
    if (!branch) throw new BadRequestException('Branch not found');

    const cart = await CartItemEntity.find({ where: { userId }, relations: { product: true } });
    if (!cart.length) throw new BadRequestException('Cart is empty');

    return OrderEntity.getRepository().manager.transaction(async (manager) => {
      const order = await manager.save(
        manager.create(OrderEntity, { ...payload, userId, status: OrderStatus.PROCESSING }),
      );
      await manager.save(
        cart.map((item) =>
          manager.create(OrderItemEntity, {
            orderId: order.id,
            productId: item.productId,
            articulId: item.articulId,
            quantity: item.quantity,
            price: item.product.price,
          }),
        ),
      );
      await manager.delete(CartItemEntity, { userId });
      return { id: order.id };
    });
  }
}
