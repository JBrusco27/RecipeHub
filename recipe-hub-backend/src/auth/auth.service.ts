import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type LoginResponse = {
    accessToken: string;
}

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
    ){}

    async login(email: string, password: string): Promise<LoginResponse>{
        const user = await this.userService.findByEmail(email);

        if(!user){
            throw new UnauthorizedException('Invalid email');
        }

        const userMatch = await bcrypt.compare(password, user.user_password)

        if(!userMatch){
            throw new UnauthorizedException('Invalid password');
        }


        const accessToken = sign(
            {
                user_id: user.user_id
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: '1h'
            }
        )

        return {
            accessToken
        }
    }


}
