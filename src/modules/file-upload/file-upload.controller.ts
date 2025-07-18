/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
import { errorMessage } from '@/errors';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { MediaService } from '../media/media.service';
import * as sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

const logger = new Logger('FileUploadController');

export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

@Controller('file-upload')
export class FileUploadController {
  constructor(
    @Inject(MediaService)
    private mediaService: MediaService,
  ) {}

  @Post('/')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/files',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuid();
          const encodedName = replaceAll(
            `${randomName}${fileExtName}`,
            ' ',
            '-',
          );
          callback(null, encodedName);
        },
      }),
      limits: { fileSize: 400 * 1024 * 1024 }, // 400Mo
      fileFilter: (req, file, callback) => {
        const allowedExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|heic|webp)$/;
        const extension = allowedExtensions.exec(file.originalname);
        if (!extension) {
          return callback(
            new BadRequestException(errorMessage.api('file').INVALID_FORMAT),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @HttpCode(201)
  async upload(@UploadedFile() file: Express.Multer.File) {
    logger.log(`File uploaded: ${file.originalname}, size: ${file.size} bytes`);

    if (!file.mimetype.startsWith('image')) {
      logger.error('Invalid file format');
      throw new BadRequestException(errorMessage.api('file').INVALID_FORMAT);
    }
    try {
      const imageData = await fs.readFile(file.path);
      const compressedImageBuffer = await sharp(imageData)
        .resize({ width: 800 })
        .webp({ quality: 80 })
        .toBuffer();

      const fileNameWithoutExtension = path.parse(file.filename).name;

      const webpFileName = `${fileNameWithoutExtension}.webp`;
      const webpFilePath = `./public/files/${webpFileName}`;
      await fs.writeFile(webpFilePath, compressedImageBuffer);
      await fs.unlink(file.path);

      return await this.mediaService.createMedia({
        ...file,
        buffer: compressedImageBuffer,
        filename: webpFileName,
        path: webpFilePath,
      });
    } catch (error) {
      logger.error(error);
      throw new BadRequestException(errorMessage.api('file').INVALID_FORMAT);
    }
  }

  @Get('populate')
  @HttpCode(200)
  async test() {
    return await this.mediaService.populateMedias();
  }
}
