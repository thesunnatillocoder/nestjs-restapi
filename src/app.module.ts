import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { CourseModule } from './course/course.module';
import { CourseFileModule } from './course-file/course-file.module';
import { UserCourseModule } from './user-course/user-course.module';

@Module({
  imports: [AuthModule, UploadFileModule, CourseModule, CourseFileModule, UserCourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
