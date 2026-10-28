import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { imageUploadOptions } from '../../../../core/configs/multer.configs';
import { UploadImageHandler } from './upload-image/upload-image.handler';

@ApiTags('admin / uploads')
@ApiBearerAuth()
@Controller('admin/uploads')
export class UploadsAdminController {
  constructor(private readonly uploadHandler: UploadImageHandler) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', imageUploadOptions))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadHandler.execute(file);
  }
}
