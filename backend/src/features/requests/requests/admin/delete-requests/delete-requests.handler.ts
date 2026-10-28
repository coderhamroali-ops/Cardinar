import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestEntity } from '../../../entities/request.entity';

@Injectable()
export class DeleteRequestsHandler {
  async execute(id: number) {
    const item = await RequestEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Requests not found');
    await item.remove();
    return { id };
  }
}
