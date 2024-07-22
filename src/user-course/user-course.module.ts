import { Module } from '@nestjs/common';
import { UserCourseController } from './user-course.controller';
import { UserCourseService } from './user-course.service';

@Module({
  controllers: [UserCourseController],
  providers: [UserCourseService]
})
export class UserCourseModule {}
