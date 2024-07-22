import { Module } from '@nestjs/common';
import { CourseFileController } from './course-file.controller';
import { CourseFileService } from './course-file.service';

@Module({
  controllers: [CourseFileController],
  providers: [CourseFileService]
})
export class CourseFileModule {}
