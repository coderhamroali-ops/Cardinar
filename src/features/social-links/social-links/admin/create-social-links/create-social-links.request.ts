import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateSocialLinksRequest {

  @ApiProperty() @IsString() @MaxLength(64) title: string;
  @ApiProperty() @IsUrl() @MaxLength(256) link: string;
  @ApiProperty({ example: 'telegram' }) @IsString() @MaxLength(128) icon: string;
}
