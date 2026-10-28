import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMaterialsRequest {

  @ApiProperty() @IsString() @MaxLength(64) title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(512) description?: string;
}
