import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PHONE_REGEX } from '../../common/validation';

export class RegisterRequest {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty({ example: '+998901234567' }) @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiProperty() @IsEmail() @MaxLength(64) email: string;
  @ApiProperty() @IsString() @MinLength(8) @MaxLength(64) password: string;
}
