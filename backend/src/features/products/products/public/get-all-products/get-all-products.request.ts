import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '../../../../../core/enum/enum';
import { PaginationFilters } from '../../../../common/pagination.filter';

const toIds = ({ value }: { value: unknown }) =>
  value === undefined ? undefined : String(value).split(',').map(Number).filter(Boolean);

export class GetAllProductsPublicRequest extends PaginationFilters {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() categoryId?: number;
  @ApiPropertyOptional({ description: 'Vergul bilan: 1,2,3' }) @IsOptional() @Transform(toIds) colorIds?: number[];
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() carMakeId?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() carModelId?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() minPrice?: number;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() maxPrice?: number;
  @ApiPropertyOptional({ enum: ProductStatus }) @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? undefined : value === 'true' || value === true))
  @IsBoolean()
  isPremium?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;

  @ApiPropertyOptional({ enum: ['new', 'price_asc', 'price_desc'] })
  @IsOptional()
  @IsIn(['new', 'price_asc', 'price_desc'])
  sort?: 'new' | 'price_asc' | 'price_desc';
}
