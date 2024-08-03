import { Module } from '@nestjs/common';
import { UserCourseController } from './user-course.controller';
import { UserCourseService } from './user-course.service';
import { UserCourse } from './model/usercourse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse]), JwtModule.register({})],
  controllers: [UserCourseController],
  providers: [UserCourseService]
})
export class UserCourseModule {}
