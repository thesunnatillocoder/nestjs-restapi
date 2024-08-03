import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from './model/usercourse.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ucDto } from './user-course.controller';

@Injectable()
export class UserCourseService {
    constructor(
        @InjectRepository(UserCourse)
        private readonly usercourseRepository: Repository<UserCourse>,
        private readonly jwtService: JwtService
    ) {};

    async setUserCourse(accessToken: string, ucDto: ucDto) {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})
            const setDate = await this.usercourseRepository.create({
                user: {id: payload.sub},
                course: {id: ucDto.courseId}
            })

            return this.usercourseRepository.save(setDate)
        } catch {
            return 'Do not allow'
        }
    };

    async getUserCourse(accessToken: string) {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})
            const data = this.usercourseRepository.find({
                where: {
                    user: {id: payload.sub}
                }
            })

            return data
        } catch {
            return 'Do not allow'
        }
    };

    async delUserCourse(accessToken: string, courseId: number): Promise<string> {
        try {
            const payload = await this.jwtService.verify(accessToken, {secret: process.env.AT_SECRET})
            const data = await this.usercourseRepository.findOne({
                where: {
                    id: courseId
                }
            })

            if (data === null) {
                return "Not found"
            } else {
                this.usercourseRepository.remove(data)
                return "User course deleted"
            }
        } catch {
            return 'Do not a11ow'
        }
    };
};
