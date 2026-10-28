import { Injectable } from '@nestjs/common';
import { RequestEntity } from '../../../entities/request.entity';
import { CreateRequestsPublicRequest } from './create-requests.request';

@Injectable()
export class CreateRequestsPublicHandler {
  // userId — token bo'lsa ariza foydalanuvchiga bog'lanadi, mehmon uchun bo'sh
  async execute(payload: CreateRequestsPublicRequest, userId?: number) {
    const request = await RequestEntity.create({ ...payload, userId }).save();
    return { id: request.id };
  }
}
