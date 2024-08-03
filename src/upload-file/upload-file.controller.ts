import { Controller, Post, Get, Req, UploadedFile, UseInterceptors, Query, Delete, Param, Res, NotFoundException, Put, Body } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller('upload-file')
export class UploadFileController {
    constructor(private readonly fileService: UploadFileService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1];
        return this.fileService.uploadFile(file, accessToken );
    }

    @Get('files')
    async getAllFiles(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1];
        return this.fileService.getAllFiles(accessToken, page, limit)
    }

    @Get('fileinfo')
    async getFileInfo(@Query('fileId') fileId: number, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1];
        return this.fileService.getFileInfo(accessToken, fileId)
    }

    @Delete('delete/:fileId')
    async deleteFile(fileId: number, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1];
        return this.fileService.deleteFile(accessToken, fileId)
    }

    @Get('download/:filename')
    async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = join(__dirname, '..', '..', 'uploads', filename);
        try {
            await this.fileService.downloadFile(filePath);
            return res.download(filePath, filename, (err) => {
        if (err) {
            throw new NotFoundException('File not found.');
            }
        });
            } catch (error) {
                throw new NotFoundException('File not found.');
            }
    }


    @Put('update/:id')
    async updateFile(@Param('id') id: number, @Body('filename') filename: string, @Req() req: Request) {
        const accessToken = req.headers.authorization.split(' ')[1];
        return this.fileService.updateFile(accessToken, id, filename)
    }
}
