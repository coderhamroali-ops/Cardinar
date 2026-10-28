import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PHONE_REGEX } from '../../../../common/validation';

export class CreateRequestsPublicRequest {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty({ example: '+998901234567' }) @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @MaxLength(64) email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(2000) comments?: string;
}
