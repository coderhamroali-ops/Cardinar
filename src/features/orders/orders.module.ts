import { BadRequestException, Body, Controller, Get, Module, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional, ApiTags, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AdminCrudController } from '../../core/crud.controller';
import { Auth, CurrentUser, TokenPayload } from '../../core/decorators';
import { OrderStatus, PaymentMethod } from '../../core/enum/enum';
import { BranchEntity } from '../branches/branch.entity';
import { CartItemEntity } from '../cart/cart-item.entity';
import { PHONE_REGEX } from '../requests/requests.module';
import { OrderEntity, OrderItemEntity } from './order.entity';

class CheckoutDto {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty() @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @MaxLength(64) email?: string;
  @ApiProperty({ description: 'Tanlangan do\'kon' }) @IsInt() branchId: number;
  @ApiProperty({ description: 'true — yetkazib berish, false — o\'zi olib ketish' }) @IsBoolean() delivery: boolean;
  @ApiProperty({ enum: PaymentMethod }) @IsEnum(PaymentMethod) paymentMethod: PaymentMethod;
}

class AdminUpdateOrderDto {
  @ApiPropertyOptional({ enum: OrderStatus }) @IsOptional() @IsEnum(OrderStatus) status?: OrderStatus;
}
class AdminCreateOrderDto extends PartialType(CheckoutDto) {}

@ApiTags('orders')
@ApiBearerAuth()
@Auth()
@Controller('orders')
class OrdersController {
  // Savatdagi barcha mahsulotlardan buyurtma yaratadi va savatni tozalaydi
  @Post()
  async checkout(@CurrentUser() user: TokenPayload, @Body() payload: CheckoutDto) {
    const branch = await BranchEntity.findOneBy({ id: payload.branchId, isActive: true });
    if (!branch) throw new BadRequestException('Branch not found');

    const cart = await CartItemEntity.find({ where: { userId: user.sub }, relations: { product: true } });
    if (!cart.length) throw new BadRequestException('Cart is empty');

    return OrderEntity.getRepository().manager.transaction(async (manager) => {
      const order = await manager.save(
        manager.create(OrderEntity, { ...payload, userId: user.sub, status: OrderStatus.PROCESSING }),
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
      await manager.delete(CartItemEntity, { userId: user.sub });
      return { id: order.id };
    });
  }

  // "История заказов"
  @Get('my')
  async my(@CurrentUser() user: TokenPayload) {
    const orders = await OrderEntity.find({
      where: { userId: user.sub },
      relations: { items: { product: { category: true } }, branch: true },
      order: { id: 'DESC' },
    });
    return orders.map((order) => ({
      ...order,
      total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }));
  }
}

@Module({
  controllers: [
    OrdersController,
    AdminCrudController('orders', OrderEntity, AdminCreateOrderDto, AdminUpdateOrderDto, {
      relations: ['items', 'items.product', 'branch', 'user'],
    }),
  ],
})
export class OrdersModule {}
