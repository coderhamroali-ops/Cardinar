import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-item.entity';
import { CartUserController } from './cart/user/cart-user.controller';
import { AddCartItemHandler } from './cart/user/add-cart-item/add-cart-item.handler';
import { ClearCartHandler } from './cart/user/clear-cart/clear-cart.handler';
import { GetCartHandler } from './cart/user/get-cart/get-cart.handler';
import { RemoveCartItemHandler } from './cart/user/remove-cart-item/remove-cart-item.handler';
import { UpdateCartItemHandler } from './cart/user/update-cart-item/update-cart-item.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity])],
  controllers: [CartUserController],
  providers: [
    GetCartHandler,
    AddCartItemHandler,
    UpdateCartItemHandler,
    RemoveCartItemHandler,
    ClearCartHandler,
  ],
})
export class CartModule {}
