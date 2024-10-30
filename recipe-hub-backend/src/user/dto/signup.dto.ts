import { IsString } from "class-validator";


export class SignupDto {

    @IsString()
    user_name: string;

    @IsString()
    user_lastname: string;

    @IsString()
    user_email: string;

    @IsString()
    user_password: string;

}