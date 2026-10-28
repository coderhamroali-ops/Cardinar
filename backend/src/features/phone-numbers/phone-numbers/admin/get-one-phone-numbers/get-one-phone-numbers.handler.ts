import { Injectable, NotFoundException } from '@nestjs/common';
import { PhoneNumberEntity } from '../../../entities/phone-number.entity';

@Injectable()
export class GetOnePhoneNumbersHandler {
  async execute(id: number) {
    const item = await PhoneNumberEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('PhoneNumbers not found');
    return item;
  }
}
