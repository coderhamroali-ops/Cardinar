import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { PHONE_REGEX } from '../../../../common/validation';
export class UpdateUsersRequest {

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(64) fullName?: string;
  @ApiPropertyOptional() @IsOptional() @Matches(PHONE_REGEX) phoneNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @MaxLength(64) email?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isAdmin?: boolean;
}
