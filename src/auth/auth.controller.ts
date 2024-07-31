import { Body, Controller, ForbiddenException, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './models/auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

        @Post('signup')
        signup(@Body() dto: AuthDto) {
          return this.authService.signup(dto)
        };
    

        @Post('signin')
        signin(@Body() dto: AuthDto) {
          return this.authService.signin(dto)
        };
    

        @Post('logout')
        async logout(@Req() request: Request): Promise<string> {
          const accessToken = request.headers.authorization.split(' ')[1];
          if (!accessToken) {
            throw new ForbiddenException('Access token is required');
          }
          await this.authService.logout(accessToken);

          return 'Successfully logged out';
        };
        

        @Post('refresh')
        async refresh(@Req() request: Request): Promise<string> {
          const refresh_token = request.headers.authorization.split(' ')[1]
          if (!refresh_token) {
            throw new ForbiddenException('Refresh token is required')
          }
          await this.authService.refresh(refresh_token)
          return 'Access token exchanged successfully'
        };
}
