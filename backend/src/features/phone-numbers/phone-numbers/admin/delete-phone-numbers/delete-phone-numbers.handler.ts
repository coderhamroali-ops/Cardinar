import { Injectable, NotFoundException } from '@nestjs/common';
import { PhoneNumberEntity } from '../../../entities/phone-number.entity';

@Injectable()
export class DeletePhoneNumbersHandler {
  async execute(id: number) {
    const item = await PhoneNumberEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('PhoneNumbers not found');
    await item.remove();
    return { id };
  }
}
