import { ConflictException } from '@nestjs/common';
import { BaseEntity, QueryFailedError } from 'typeorm';

// Unique ustun takrorlansa 500 o'rniga 409 qaytaradi
export async function saveOrConflict<T extends BaseEntity>(entity: T): Promise<T> {
  try {
    return await entity.save();
  } catch (error) {
    if (error instanceof QueryFailedError && (error as any).code === '23505') {
      throw new ConflictException((error as any).detail ?? 'Already exists');
    }
    throw error;
  }
}
