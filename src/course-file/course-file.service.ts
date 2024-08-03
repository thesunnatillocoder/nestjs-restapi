import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseFile } from './model/coursefile.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { cfDto } from './course-file.controller';

@Injectable()
export class CourseFileService {
    constructor(
        @InjectRepository(CourseFile)
        private readonly coursefileRepository: Repository<CourseFile>,
        private readonly jwtService: JwtService,
    ) {};

    async setCourse(cfDto: cfDto, accessToken: string, courseId: number, fileId: number) {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})

            const newCourseFile = this.coursefileRepository.create({
                coursefilename: cfDto.cf_name,
                course: {id: courseId},
                file: {id: fileId}
            })

            return this.coursefileRepository.save(newCourseFile)
        } catch {
            return 'Do not allow'
        }
    };

    async getCourseFile(accessToken: string, cfId: number) {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})

            const data = await this.coursefileRepository.findOne({
                where: {
                    id: cfId
                }
            })

            return data
        } catch {
            return 'Do not allow'
        }
    };

    async deleteCourseFile(accessToken: string, cfId: number): Promise<string> {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})

            const data = await this.coursefileRepository.findOne({
                where: {
                    id: cfId
                }
            })

            if (data === null) {
                return 'Not found'
            } else {
                this.coursefileRepository.remove(data)
                return "Course File deleted"
            }
        } catch {
            return "Do not allow"
        }
    };
};
