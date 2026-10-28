import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { CustomCategory } from '../../../../../core/enum/enum';
export class CreateCustomModelsRequest {

  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty() @IsString() @MaxLength(256) image: string;
}
