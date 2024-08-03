import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './model/uploadfile.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([File]), JwtModule.register({})],
  controllers: [UploadFileController],
  providers: [UploadFileService]
})
export class UploadFileModule {}
