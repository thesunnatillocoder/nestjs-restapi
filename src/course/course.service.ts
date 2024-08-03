import { ForbiddenException, Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './model/course.entity';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {

    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        private readonly jwtService: JwtService,
    ) {}

    async addCourse(accessToken: string, dto: CourseDto) {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})
        
            const newCourse = this.courseRepository.create({
                title: dto.title,
                description: dto.description,
                user: {id: payload.sub}
            })

            return this.courseRepository.save(newCourse)
        } catch {
            return "Do not allow"
        }
    };

    async getAllCourse(page: number, limit: number) {
        try {
            const [data, count] = await this.courseRepository.findAndCount({
                skip: (page-1) * limit,
                take: limit
            });
    
            return {data, count}
        } catch {
            return "Do not allow"
        }
    };

    async updateCourse(accessToken: string, courseId: number, dto: CourseDto) {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})

            const course = await this.courseRepository.findOne({
                where: {
                    id: courseId,
                    user: {id: payload.sub}
                }
            });
            course.title = dto.title
            course.description = dto.description

            return this.courseRepository.save(course)
        } catch {
            return "Do not allow"
        }
    };

    async getCourseInfo(courseId: number) {
        try {
            const data = await this.courseRepository.findOne({
                where: {
                    id: courseId
                }
            });
    
            return `ID: ${data.id} Title: ${data.title} Desc: ${data.description}`
        } catch {
            return "Do not allow"
        }
    };

    async deleteCourse(accessToken: string, courseId: number) {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})
            const data = await this.courseRepository.findOne({
                where: {
                    id: courseId,
                    user: {id: payload.sub}
                }
            })
            
            if(data === null) {
                return `Course not found`
            } else {
                this.courseRepository.remove(data)
                return "Course deleted"
            } 
        } catch {
            return "Do not allow"
        }
    };
};
