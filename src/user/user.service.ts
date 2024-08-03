import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/auth/models/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
        private readonly jwtService: JwtService
    ) {};

    async getUserInfo(accessToken: string) {
        try {
            const payload = await this.jwtService.verify(accessToken, { secret: process.env.AT_SECRET});
    
            const userInfo = await this.userRepository.find({
                where: {
                    email: payload.email
                }
            });
            delete userInfo[0].hash
            return userInfo
        } catch {
            return 'Do not allow'
        }
    };
};
