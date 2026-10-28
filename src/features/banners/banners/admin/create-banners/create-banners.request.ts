import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class CreateBannersRequest {

  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty({ description: 'Yuklangan rasm yo\'li: uploads/...' }) @IsString() @MaxLength(256) image: string;
  @ApiProperty() @IsBoolean() isActive: boolean;
}
