import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsHexColor, IsString, MaxLength } from 'class-validator';

export class CreateColorsRequest {

  @ApiProperty() @IsString() @MaxLength(64) title: string;
  @ApiProperty({ example: '#E31E24' }) @IsHexColor() color: string;
}
