import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItemEntity } from '../../../entities/cart-item.entity';

@Injectable()
export class RemoveCartItemHandler {
  async execute(userId: number, id: number) {
    const result = await CartItemEntity.delete({ id, userId });
    if (!result.affected) throw new NotFoundException('Cart item not found');
    return { id };
  }
}
