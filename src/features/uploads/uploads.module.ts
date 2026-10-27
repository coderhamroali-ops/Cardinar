import { BadRequestException, Controller, Module, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

const ALLOWED = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

// Admin panel rasm yuklaydi va qaytgan yo'lni mahsulot/banner/qism yozuvlarida ishlatadi
@ApiTags('admin / uploads')
@ApiBearerAuth()
@Controller('admin/uploads')
class UploadsController {
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) =>
        ALLOWED.includes(path.extname(file.originalname).toLowerCase())
          ? cb(null, true)
          : cb(new BadRequestException('Only image files are allowed'), false),
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const dir = path.join(process.cwd(), 'uploads', 'images');
          fs.mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (_req, file, cb) => cb(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is required');
    return { path: `uploads/images/${file.filename}` };
  }
}

@Module({ controllers: [UploadsController] })
export class UploadsModule {}
