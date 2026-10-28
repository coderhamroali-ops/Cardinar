import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreatePhoneNumbersRequest {

  @ApiProperty({ example: '(90) 920 20 20' }) @IsString() @MaxLength(16) value: string;
}
