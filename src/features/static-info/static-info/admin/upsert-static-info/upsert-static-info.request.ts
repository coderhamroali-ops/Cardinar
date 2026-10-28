import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class UpsertStaticInfoRequest {
  @ApiProperty() @IsString() @MaxLength(128) address: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber: string;
  @ApiProperty({ example: 'Пн - Вс 9:00 - 19:00' }) @IsString() @MaxLength(128) workingHours: string;
  @ApiProperty() @IsEmail() @MaxLength(64) email: string;
}
