import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateArticulsRequest {

  @ApiProperty() @IsInt() productId: number;
  @ApiProperty() @IsInt() carModelId: number;
}
