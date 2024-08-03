import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CourseFileService } from './course-file.service';
import { Request } from 'express';

export class cfDto {
    cf_name: string
}

@Controller('course/file')
export class CourseFileController {
    constructor(private readonly coursefileService: CourseFileService) {}

    @Post('set')
    setCourse(@Body() cfDto: cfDto, @Query('courseId') courseId: number, @Query('fileId') fileId: number, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.coursefileService.setCourse(cfDto, accessToken, courseId, fileId)
    }

    @Get(':id')
    getCourseFile(@Param('id') id: number, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.coursefileService.getCourseFile(accessToken, id)
    }

    @Delete('del/:id')
    deleteCourseFile(@Param('id') id: number, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1]
        return this.coursefileService.deleteCourseFile(accessToken, id)
    }
};
