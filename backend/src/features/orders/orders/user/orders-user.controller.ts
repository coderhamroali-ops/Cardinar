import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../core/decorators/auth.decorator';
import { CurrentUser, TokenPayload } from '../../../../core/decorators/current-user.decorator';
import { CheckoutOrderHandler } from './checkout-order/checkout-order.handler';
import { CheckoutOrderRequest } from './checkout-order/checkout-order.request';
import { GetMyOrdersHandler } from './get-my-orders/get-my-orders.handler';

@ApiTags('orders')
@ApiBearerAuth()
@Auth()
@Controller('orders')
export class OrdersUserController {
  constructor(
    private readonly checkoutHandler: CheckoutOrderHandler,
    private readonly getMyHandler: GetMyOrdersHandler,
  ) {}

  @Post()
  async checkout(@CurrentUser() user: TokenPayload, @Body() payload: CheckoutOrderRequest) {
    return await this.checkoutHandler.execute(user.sub, payload);
  }

  @Get('my')
  async getMy(@CurrentUser() user: TokenPayload) {
    return await this.getMyHandler.execute(user.sub);
  }
}
