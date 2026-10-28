import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestEntity } from '../../../entities/request.entity';

@Injectable()
export class GetOneRequestsHandler {
  async execute(id: number) {
    const item = await RequestEntity.findOne({ where: { id }, relations: { user: true } });
    if (!item) throw new NotFoundException('Requests not found');
    return item;
  }
}
