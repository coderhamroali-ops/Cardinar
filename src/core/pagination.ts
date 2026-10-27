import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQuery {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  size?: number;
}

export interface Paginated<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function paginate<T>(data: T[], totalCount: number, page: number, size: number): Paginated<T> {
  const totalPages = Math.max(1, Math.ceil(totalCount / size));
  return {
    data,
    totalCount,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}
