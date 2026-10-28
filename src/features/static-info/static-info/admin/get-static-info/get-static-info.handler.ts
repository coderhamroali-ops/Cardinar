import { Injectable } from '@nestjs/common';
import { StaticInfoEntity } from '../../../entities/static-info.entity';

@Injectable()
export class GetStaticInfoHandler {
  async execute() {
    return StaticInfoEntity.findOne({ where: {}, order: { id: 'ASC' } });
  }
}
