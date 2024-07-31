import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    id?: number;

    createdAt?: Date;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    hash: string;

    fullname?: string;
    
    isadmin: boolean;
}