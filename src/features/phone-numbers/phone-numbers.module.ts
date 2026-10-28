import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberEntity } from './entities/phone-number.entity';
import { PhoneNumbersAdminController } from './phone-numbers/admin/phone-numbers-admin.controller';
import { CreatePhoneNumbersHandler } from './phone-numbers/admin/create-phone-numbers/create-phone-numbers.handler';
import { GetAllPhoneNumbersHandler } from './phone-numbers/admin/get-all-phone-numbers/get-all-phone-numbers.handler';
import { GetOnePhoneNumbersHandler } from './phone-numbers/admin/get-one-phone-numbers/get-one-phone-numbers.handler';
import { UpdatePhoneNumbersHandler } from './phone-numbers/admin/update-phone-numbers/update-phone-numbers.handler';
import { DeletePhoneNumbersHandler } from './phone-numbers/admin/delete-phone-numbers/delete-phone-numbers.handler';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumberEntity])],
  controllers: [
    PhoneNumbersAdminController,
  ],
  providers: [
    CreatePhoneNumbersHandler,
    GetAllPhoneNumbersHandler,
    GetOnePhoneNumbersHandler,
    UpdatePhoneNumbersHandler,
    DeletePhoneNumbersHandler,
  ],
})
export class PhoneNumbersModule {}
