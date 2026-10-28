import { Injectable } from '@nestjs/common';
import { CartItemEntity } from '../../../entities/cart-item.entity';

@Injectable()
export class ClearCartHandler {
  async execute(userId: number) {
    await CartItemEntity.delete({ userId });
    return { cleared: true };
  }
}
