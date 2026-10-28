import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ProductStatus } from '../../../../../core/enum/enum';
export class CreateProductsRequest {

  @ApiProperty() @IsInt() categoryId: number;
  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty() @IsNumber() @Min(0) price: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional({ enum: ProductStatus }) @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isPremium?: boolean;
}
