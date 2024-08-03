import { Module } from '@nestjs/common';
import { CourseFileController } from './course-file.controller';
import { CourseFileService } from './course-file.service';
import { CourseFile } from './model/coursefile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CourseFile]), JwtModule.register({})],
  controllers: [CourseFileController],
  providers: [CourseFileService]
})
export class CourseFileModule {}
