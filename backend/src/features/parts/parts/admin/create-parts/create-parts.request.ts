import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { CustomCategory, PartType } from '../../../../../core/enum/enum';
export class CreatePartsRequest {

  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
  @ApiProperty({ enum: PartType }) @IsEnum(PartType) part: PartType;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(128) title?: string;
  @ApiProperty() @IsInt() materialId: number;
  @ApiProperty() @IsInt() colorId: number;
  @ApiProperty() @IsString() @MaxLength(256) image: string;
}
