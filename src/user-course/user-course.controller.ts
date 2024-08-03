import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { Request } from 'express';

export class ucDto {
    courseId: number
}

@Controller('user-course')
export class UserCourseController {
    constructor(private readonly usercourseService: UserCourseService) {};

    @Post('set/course')
    setUserCourse(@Body() ucDto: ucDto, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.usercourseService.setUserCourse(accessToken, ucDto)
    };

    @Get('all')
    getCourseFile(@Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.usercourseService.getUserCourse(accessToken)
    };

    @Delete('del/:id')
    delUserCourse(@Param('id') id: number, @Req() req: Request): Promise<string> {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.usercourseService.delUserCourse(accessToken, id)
    };
};
