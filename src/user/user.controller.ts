import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('info')
    getUserInfo(@Req() request: Request) {
        const accessToken = request.headers.authorization.split(" ")[1];
        return this.userService.getUserInfo(accessToken);
    };
}
