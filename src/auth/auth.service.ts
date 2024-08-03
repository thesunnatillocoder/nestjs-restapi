import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './models/auth.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './models/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwtpayload.type';
import { Tokens } from './types/token.type';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
    ) {}


    async signup(dto: AuthDto) {

        const passwordHash = await this.password_hash(dto.hash);
        const newUser = {
          ...dto,
          hash: passwordHash
        };
        const user = await this.usersRepository.save(newUser);
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.redisService.set(`at_${newUser.id}`, tokens.access_token);
        await this.redisService.set(`rt_${newUser.id}`, tokens.refresh_token);

        return user;
    };


    async signin(dto: AuthDto) {

        const user = await this.usersRepository.find({
          where: {
            email: dto.email
          }
        })
        if (user.length == 0) throw new ForbiddenException('Account not found');
        const passwordMatches = await bcrypt.compare(dto.hash, user[0].hash)
        console.log(passwordMatches)
        if (!passwordMatches) throw new ForbiddenException('Password error');
        const tokens = await this.getTokens(user[0].id, user[0].email);
        await this.redisService.set(`at_${user[0].id}`, tokens.access_token);
        await this.redisService.set(`rt_${user[0].id}`, tokens.refresh_token);

        return tokens;
    };


    async logout(accessToken: string): Promise<void> {
      try {
        const payload = this.jwtService.verify(accessToken, { secret: process.env.AT_SECRET });
        await this.redisService.del(`at_${payload.sub}`);
        await this.redisService.del(`rt_${payload.sub}`);
      } catch (error) {
        throw new ForbiddenException('Invalid token');
      }
    };


    async refresh(refreshToken: string): Promise<void> {
        const payload = this.jwtService.verify(refreshToken, { secret: process.env.RT_SECRET });
        const storeRt = await this.redisService.get(`rt_${payload.sub}`);
        if (refreshToken !== storeRt) {
          throw new ForbiddenException("Invalid refrsh token");
        }
        const newAt = (await this.getTokens(payload.sub, payload.email)).access_token
        await this.redisService.set(`at_${payload.sub}`, newAt);
    };


    async password_hash(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    };


    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.AT_SECRET,
                expiresIn: '60m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.RT_SECRET,
                expiresIn: '7d',
            }),
        ]);
      
        return {
            access_token: at,
            refresh_token: rt,
        };
    };
}

