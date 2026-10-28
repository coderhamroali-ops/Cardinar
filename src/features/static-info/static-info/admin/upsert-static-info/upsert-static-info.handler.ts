import { Injectable } from '@nestjs/common';
import { StaticInfoEntity } from '../../../entities/static-info.entity';
import { UpsertStaticInfoRequest } from './upsert-static-info.request';

// Singleton: yozuv bo'lmasa yaratiladi, bo'lsa yangilanadi
@Injectable()
export class UpsertStaticInfoHandler {
  async execute(payload: UpsertStaticInfoRequest) {
    const info = (await StaticInfoEntity.findOne({ where: {}, order: { id: 'ASC' } })) ?? StaticInfoEntity.create();
    Object.assign(info, payload);
    return info.save();
  }
}
