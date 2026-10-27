import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../core/base-model';

@Entity('users')
export class UserEntity extends BaseModel {
  @ApiProperty() @Column({ length: 64 }) fullName: string;
  @ApiProperty() @Column({ length: 16, unique: true }) phoneNumber: string;
  @ApiProperty() @Column({ length: 64, unique: true }) email: string;
  @Column({ length: 128, select: false }) password: string;
  @ApiProperty() @Column({ default: false }) isAdmin: boolean;
}
