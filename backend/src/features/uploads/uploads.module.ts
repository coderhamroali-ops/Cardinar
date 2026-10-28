import { Module } from '@nestjs/common';
import { UploadsAdminController } from './uploads/admin/uploads-admin.controller';
import { UploadImageHandler } from './uploads/admin/upload-image/upload-image.handler';

@Module({
  controllers: [UploadsAdminController],
  providers: [UploadImageHandler],
})
export class UploadsModule {}
