import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { CourseModule } from './course/course.module';
import { CourseFileModule } from './course-file/course-file.module';
import { UserCourseModule } from './user-course/user-course.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    AuthModule,
    UploadFileModule,
    CourseModule,
    CourseFileModule,
    UserCourseModule,
    UserModule,

    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule
  ],
})
export class AppModule {}
