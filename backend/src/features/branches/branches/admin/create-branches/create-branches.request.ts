import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { BranchType } from '../../../../../core/enum/enum';
export class CreateBranchesRequest {

  @ApiProperty() @IsString() @MaxLength(128) title: string;
  @ApiProperty() @IsString() @MaxLength(128) address: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(64) district?: string;
  @ApiProperty() @IsString() @MaxLength(64) region: string;
  @ApiProperty() @IsString() @MaxLength(16) phoneNumber: string;
  @ApiProperty() @IsNumber() longitude: number;
  @ApiProperty() @IsNumber() latitude: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiProperty({ enum: BranchType }) @IsEnum(BranchType) branchType: BranchType;
}
