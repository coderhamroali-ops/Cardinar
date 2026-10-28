import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BranchType } from '../../../../../core/enum/enum';

export class GetAllBranchesPublicRequest {
  @ApiPropertyOptional({ enum: BranchType }) @IsOptional() @IsEnum(BranchType) branchType?: BranchType;
  @ApiPropertyOptional() @IsOptional() @IsString() region?: string;
}
