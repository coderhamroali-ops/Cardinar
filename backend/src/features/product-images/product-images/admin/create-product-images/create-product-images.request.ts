import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateProductImagesRequest {

  @ApiProperty() @IsInt() productId: number;
  @ApiProperty() @IsString() @MaxLength(256) image: string;
  @ApiProperty({ description: 'Tartib raqami' }) @IsInt() position: number;
}
