import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../core/base-model';
import { UserEntity } from '../users/user.entity';

// "Нужна помощь с выбором?", "Контакты" va "Купить в один клик" formalaridan keladigan arizalar.
// Mehmon ham yuborishi mumkin, shuning uchun userId ixtiyoriy.
@Entity('requests')
export class RequestEntity extends BaseModel {
  @ApiProperty() @Column({ nullable: true }) userId?: number;
  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ApiProperty() @Column({ length: 64 }) fullName: string;
  @ApiProperty() @Column({ length: 16 }) phoneNumber: string;
  @ApiProperty() @Column({ length: 64, nullable: true }) email?: string;
  @ApiProperty() @Column({ length: 2000, nullable: true }) comments?: string;
}
