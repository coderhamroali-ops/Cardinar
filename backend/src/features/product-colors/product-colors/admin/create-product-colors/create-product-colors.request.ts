import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateProductColorsRequest {

  @ApiProperty() @IsInt() productId: number;
  @ApiProperty() @IsInt() colorId: number;
}
