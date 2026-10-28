import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateCategoriesRequest {

  @ApiProperty() @IsString() @MaxLength(128) title: string;
}
