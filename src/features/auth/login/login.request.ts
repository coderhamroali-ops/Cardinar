import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ description: 'Email yoki telefon raqam' }) @IsString() @MaxLength(64) login: string;
  @ApiProperty() @IsString() @MaxLength(64) password: string;
}
