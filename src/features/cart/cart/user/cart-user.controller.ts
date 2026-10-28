import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../core/decorators/auth.decorator';
import { CurrentUser, TokenPayload } from '../../../../core/decorators/current-user.decorator';
import { AddCartItemHandler } from './add-cart-item/add-cart-item.handler';
import { AddCartItemRequest } from './add-cart-item/add-cart-item.request';
import { ClearCartHandler } from './clear-cart/clear-cart.handler';
import { GetCartHandler } from './get-cart/get-cart.handler';
import { RemoveCartItemHandler } from './remove-cart-item/remove-cart-item.handler';
import { UpdateCartItemHandler } from './update-cart-item/update-cart-item.handler';
import { UpdateCartItemRequest } from './update-cart-item/update-cart-item.request';

@ApiTags('cart')
@ApiBearerAuth()
@Auth()
@Controller('cart')
export class CartUserController {
  constructor(
    private readonly getHandler: GetCartHandler,
    private readonly addHandler: AddCartItemHandler,
    private readonly updateHandler: UpdateCartItemHandler,
    private readonly removeHandler: RemoveCartItemHandler,
    private readonly clearHandler: ClearCartHandler,
  ) {}

  @Get()
  async get(@CurrentUser() user: TokenPayload) {
    return await this.getHandler.execute(user.sub);
  }

  @Post()
  async add(@CurrentUser() user: TokenPayload, @Body() payload: AddCartItemRequest) {
    return await this.addHandler.execute(user.sub, payload);
  }

  @Patch(':id')
  async update(@CurrentUser() user: TokenPayload, @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCartItemRequest) {
    return await this.updateHandler.execute(user.sub, id, payload);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: TokenPayload, @Param('id', ParseIntPipe) id: number) {
    return await this.removeHandler.execute(user.sub, id);
  }

  @Delete()
  async clear(@CurrentUser() user: TokenPayload) {
    return await this.clearHandler.execute(user.sub);
  }
}
