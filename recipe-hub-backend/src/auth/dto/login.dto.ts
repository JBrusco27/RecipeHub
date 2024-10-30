import { IsNotEmpty, MaxLength, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password: string;
}