import { Injectable } from '@nestjs/common';
import { CartItemEntity } from '../../../entities/cart-item.entity';

export const CART_RELATIONS = { product: { images: true }, articul: { carModel: true } };

@Injectable()
export class GetCartHandler {
  async execute(userId: number) {
    return CartItemEntity.find({
      where: { userId },
      relations: CART_RELATIONS,
      order: { id: 'ASC', product: { images: { position: 'ASC' } } },
    });
  }
}
