import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrdersAdminController } from './orders/admin/orders-admin.controller';
import { OrdersUserController } from './orders/user/orders-user.controller';
import { GetAllOrdersHandler } from './orders/admin/get-all-orders/get-all-orders.handler';
import { GetOneOrdersHandler } from './orders/admin/get-one-orders/get-one-orders.handler';
import { UpdateOrdersHandler } from './orders/admin/update-orders/update-orders.handler';
import { DeleteOrdersHandler } from './orders/admin/delete-orders/delete-orders.handler';
import { CheckoutOrderHandler } from './orders/user/checkout-order/checkout-order.handler';
import { GetMyOrdersHandler } from './orders/user/get-my-orders/get-my-orders.handler';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  controllers: [
    OrdersAdminController,
    OrdersUserController,
  ],
  providers: [
    GetAllOrdersHandler,
    GetOneOrdersHandler,
    UpdateOrdersHandler,
    DeleteOrdersHandler,
    CheckoutOrderHandler,
    GetMyOrdersHandler,
  ],
})
export class OrdersModule {}
