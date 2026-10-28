import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CustomCategory } from '../../../../../core/enum/enum';
import { PHONE_REGEX } from '../../../../common/validation';

export class CreateCustomProductRequest {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty() @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @MaxLength(64) email?: string;
  @ApiProperty() @IsInt() carMakeId: number;
  @ApiProperty() @IsInt() carModelId: number;
  @ApiProperty({ enum: CustomCategory }) @IsEnum(CustomCategory) category: CustomCategory;
  @ApiProperty() @IsInt() modelId: number;
  @ApiProperty() @IsBoolean() withLogo: boolean;

  @ApiProperty({ description: 'Konstruktorda yig\'ilgan rasm: data:image/jpeg;base64,...' })
  @IsString()
  image: string;
}
