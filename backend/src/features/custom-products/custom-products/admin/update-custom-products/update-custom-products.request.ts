import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCustomProductsRequest {

  @ApiPropertyOptional({ description: 'Ariza ko\'rib chiqilgach false qilinadi' }) @IsOptional() @IsBoolean() isActive?: boolean;
}
