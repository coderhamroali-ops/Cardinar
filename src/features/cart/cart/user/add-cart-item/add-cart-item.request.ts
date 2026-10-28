import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class AddCartItemRequest {
  @ApiProperty() @IsInt() productId: number;
  @ApiProperty({ description: 'Tanlangan avtomobil modeli uchun artikul' }) @IsInt() articulId: number;
  @ApiProperty({ default: 1 }) @IsInt() @Min(1) @Max(99) quantity: number;
}
