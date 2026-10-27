import { Body, Controller, Module, Post } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AdminCrudController } from '../../core/crud.controller';
import { CurrentUser, OptionalAuth, TokenPayload } from '../../core/decorators';
import { RequestEntity } from './request.entity';

export const PHONE_REGEX = /^\+?[0-9\s()-]{7,16}$/;

class CreateRequestDto {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(64) fullName: string;
  @ApiProperty({ example: '+998901234567' }) @Matches(PHONE_REGEX) phoneNumber: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() @MaxLength(64) email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(2000) comments?: string;
}
class UpdateRequestDto extends PartialType(CreateRequestDto) {}

@ApiTags('public / requests')
@Controller('public/requests')
class RequestsPublicController {
  // Mehmon ham yuborishi mumkin; token bo'lsa ariza foydalanuvchiga bog'lanadi
  @OptionalAuth()
  @Post()
  async create(@Body() payload: CreateRequestDto, @CurrentUser() user?: TokenPayload) {
    const request = await RequestEntity.create({ ...payload, userId: user?.sub }).save();
    return { id: request.id };
  }
}

@Module({
  controllers: [
    RequestsPublicController,
    AdminCrudController('requests', RequestEntity, CreateRequestDto, UpdateRequestDto, { relations: ['user'] }),
  ],
})
export class RequestsModule {}
