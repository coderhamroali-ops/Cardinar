import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItemEntity } from '../../../entities/cart-item.entity';
import { UpdateCartItemRequest } from './update-cart-item.request';

@Injectable()
export class UpdateCartItemHandler {
  async execute(userId: number, id: number, payload: UpdateCartItemRequest) {
    const item = await CartItemEntity.findOneBy({ id, userId });
    if (!item) throw new NotFoundException('Cart item not found');
    item.quantity = payload.quantity;
    return item.save();
  }
}
