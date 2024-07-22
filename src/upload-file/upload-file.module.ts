import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService]
})
export class UploadFileModule {}
