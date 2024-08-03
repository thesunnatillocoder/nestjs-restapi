import { Controller, Post, Body, Req, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { Request } from 'express';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('add')
    addCourse(@Body() dto: CourseDto, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.courseService.addCourse(accessToken, dto)
    };

    @Get('courses')
    getAllCourse(@Query('page') page: number=1, limit: number=10) {
        return this.courseService.getAllCourse(page, limit)
    };

    @Put('update/:id')
    updateCourse(@Param('id') id: number, @Body() dto: CourseDto, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.courseService.updateCourse(accessToken, id, dto)
    };

    @Get('info/:id')
    getCourseInfo(@Param('id') id: number) {
        return this.courseService.getCourseInfo(id)
    };

    @Delete('del/:id')
    deleteCourse(@Param('id') id: number, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.courseService.deleteCourse(accessToken, id)
    }
}
