import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class UpdateCartItemRequest {
  @ApiProperty() @IsInt() @Min(1) @Max(99) quantity: number;
}
