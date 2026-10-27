import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../core/base-model';
import { BranchType } from '../../core/enum/enum';

const coordinate = { type: 'decimal' as const, precision: 12, scale: 9, transformer: { to: (v: number) => v, from: (v: string) => Number(v) } };

@Entity('branches')
export class BranchEntity extends BaseModel {
  @ApiProperty() @Column({ length: 128 }) title: string;
  @ApiProperty() @Column({ length: 128 }) address: string;
  @ApiProperty() @Column({ length: 64, nullable: true }) district?: string;
  @ApiProperty() @Column({ length: 64 }) region: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column(coordinate) longitude: number;
  @ApiProperty() @Column(coordinate) latitude: number;
  @ApiProperty() @Column({ default: true }) isActive: boolean;
  @ApiProperty({ enum: BranchType }) @Column({ type: 'enum', enum: BranchType }) branchType: BranchType;
}
