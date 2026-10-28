import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticulEntity } from '../../../../articuls/entities/articul.entity';
import { CartItemEntity } from '../../../entities/cart-item.entity';
import { AddCartItemRequest } from './add-cart-item.request';

// Shu mahsulot+artikul allaqachon savatda bo'lsa, soni oshiriladi
@Injectable()
export class AddCartItemHandler {
  async execute(userId: number, payload: AddCartItemRequest) {
    const articul = await ArticulEntity.findOneBy({ id: payload.articulId, productId: payload.productId });
    if (!articul) throw new BadRequestException('Articul does not belong to this product');

    const existing = await CartItemEntity.findOneBy({ userId, articulId: payload.articulId });
    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + payload.quantity);
      return existing.save();
    }
    return CartItemEntity.create({ ...payload, userId }).save();
  }
}
