import { BadRequestException, Injectable } from '@nestjs/common';

// Fayl multer tomonidan saqlangan; qaytgan yo'l mahsulot/banner/qism yozuvlarida ishlatiladi
@Injectable()
export class UploadImageHandler {
  execute(file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is required');
    return { path: `uploads/images/${file.filename}` };
  }
}
