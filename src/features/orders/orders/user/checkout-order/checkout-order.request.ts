import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PaymentMethod } from '../../../../../core/enum/enum';
import { PHONE_REGEX } from '../../../../common/validation';

export class CheckoutOrderRequest {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty() @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @MaxLength(64) email?: string;
  @ApiProperty({ description: 'Tanlangan do\'kon' }) @IsInt() branchId: number;
  @ApiProperty({ description: 'true — yetkazib berish, false — o\'zi olib ketish' }) @IsBoolean() delivery: boolean;
  @ApiProperty({ enum: PaymentMethod }) @IsEnum(PaymentMethod) paymentMethod: PaymentMethod;
}
