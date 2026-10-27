import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Module,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { Auth, CurrentUser, TokenPayload } from '../../core/decorators';
import { ArticulEntity } from '../catalog/catalog.entity';
import { CartItemEntity } from './cart-item.entity';

class AddCartItemDto {
  @ApiProperty() @IsInt() productId: number;
  @ApiProperty({ description: 'Tanlangan avtomobil modeli uchun artikul' }) @IsInt() articulId: number;
  @ApiProperty({ default: 1 }) @IsInt() @Min(1) @Max(99) quantity: number;
}

class UpdateCartItemDto {
  @ApiProperty() @IsInt() @Min(1) @Max(99) quantity: number;
}

export const cartRelations = { product: { images: true }, articul: { carModel: true } };

@ApiTags('cart')
@ApiBearerAuth()
@Auth()
@Controller('cart')
class CartController {
  @Get()
  list(@CurrentUser() user: TokenPayload) {
    return CartItemEntity.find({
      where: { userId: user.sub },
      relations: cartRelations,
      order: { id: 'ASC', product: { images: { position: 'ASC' } } },
    });
  }

  // Shu mahsulot+artikul allaqachon savatda bo'lsa, soni oshiriladi
  @Post()
  async add(@CurrentUser() user: TokenPayload, @Body() payload: AddCartItemDto) {
    const articul = await ArticulEntity.findOneBy({ id: payload.articulId, productId: payload.productId });
    if (!articul) throw new BadRequestException('Articul does not belong to this product');

    const existing = await CartItemEntity.findOneBy({ userId: user.sub, articulId: payload.articulId });
    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + payload.quantity);
      return existing.save();
    }
    return CartItemEntity.create({ ...payload, userId: user.sub }).save();
  }

  @Patch(':id')
  async update(@CurrentUser() user: TokenPayload, @Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCartItemDto) {
    const item = await CartItemEntity.findOneBy({ id, userId: user.sub });
    if (!item) throw new NotFoundException('Cart item not found');
    item.quantity = payload.quantity;
    return item.save();
  }

  @Delete(':id')
  async remove(@CurrentUser() user: TokenPayload, @Param('id', ParseIntPipe) id: number) {
    const result = await CartItemEntity.delete({ id, userId: user.sub });
    if (!result.affected) throw new NotFoundException('Cart item not found');
    return { id };
  }

  @Delete()
  async clear(@CurrentUser() user: TokenPayload) {
    await CartItemEntity.delete({ userId: user.sub });
    return { cleared: true };
  }
}

@Module({ controllers: [CartController] })
export class CartModule {}
