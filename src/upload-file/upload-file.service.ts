import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { UsersEntity } from 'src/auth/models/auth.entity';
import { File } from './model/uploadfile.entity';
import { Repository } from 'typeorm';
import { extname, join } from 'path';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

@Injectable()
export class UploadFileService {

    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        private readonly jwtService: JwtService,
    ) {};


    async uploadFile(file: Express.Multer.File, accessToken: string) {
        try {
            const filePath = join(__dirname, '..', '..', 'uploads', file.originalname);
            writeFileSync(filePath, file.buffer);
            const payload = this.jwtService.verify(accessToken, { secret: process.env.AT_SECRET });
            const newFile = this.fileRepository.create({
                filename: file.originalname,
                extension: extname(file.originalname),
                filesize: file.size,
                path: filePath,
                user: payload.sub
            });

            return this.fileRepository.save(newFile);
        } catch {
            return "Do not allow"
        }
    };


    async getAllFiles(accessToken: string, page: number, limit: number) {
        try {
            const payload = this.jwtService.verify(accessToken, { secret: process.env.AT_SECRET });
            const [data, count] = await this.fileRepository.findAndCount({
                where: { user: {id: payload.sub} },
                skip: (page - 1) * limit,
                take: limit,
            });

            return { data, count };
        } catch {
            return "Do not allow"
        }
    };


    async getFileInfo(accessToken: string, fileId: number) {
        try {
            const payload = this.jwtService.verify(accessToken, { secret: process.env.AT_SECRET });

            const data = await this.fileRepository.findOne({
                where: {
                    id: fileId,
                    user: {id: payload.sub}
                }
            })

            return data
        } catch {
            return "Do not allow"
        }
    };


    async deleteFile(accessToken: string, fileId: number): Promise<string> {
        try {
            const payload = this.jwtService.verify(accessToken, { secret: process.env.AT_SECRET });

            const file = await this.fileRepository.find({
                where: {
                    id: fileId,
                    user: {id: payload.sub}
                }
            })

            if (file === null) {
                return 'Not found'
            } else {
                fs.unlinkSync(file[0].path)
                this.fileRepository.remove(file)
                return 'delete file'
            }
        } catch {
            return "Do not allow"
        }
    };

    async downloadFile(filePath: string) {
        try {
            await fsPromises.access(filePath);
          } catch (error) {
            throw new Error('File not found');
          }
    };

    async updateFile(accessToken: string, fileId: number, filename: string) {
        try {
            const payload = this.jwtService.verify(accessToken, { secret: process.env.AT_SECRET });

            const file = await this.fileRepository.findOne({
                where: {
                    id: fileId,
                    user: { id: payload.sub }
                }
            })
            file.filename = filename
            return await this.fileRepository.save(file)
        } catch {
            return 'Do not allow'
        }
    };
};
