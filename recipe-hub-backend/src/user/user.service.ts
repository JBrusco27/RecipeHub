import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entiy';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtUtilService } from 'src/auth/jwt/jwt-util.service';

@Injectable()
export class UserService {

    constructor(
        private jwtUtilService: JwtUtilService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    
    async findByEmail(email: string){
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select(
                [
                    'user.user_id', 
                    'user.user_name',
                    'user.user_lastname', 
                    'user.user_email', 
                    'user.user_password', 
                    'user.user_profile_image', 
                    'user.user_created_at']
                )
            .where('user.user_email = :email', { email })
            .getOne();

        return user;
    }

    async signup(dto: SignupDto){

            if(await this.findByEmail(dto.user_email)){
                throw new ConflictException('Email already exists');
            }

            const password_hash = await bcrypt.hash(dto.user_password, 10);
            dto.user_email = dto.user_email.trim().toLowerCase();
            dto.user_password = password_hash;
            const user = await this.userRepository.save(dto);
            return user;
    }

    async getUserDetails(user_id: number){
        const userDetails = await this.userRepository.findOne(
            {
                where: { 
                    user_id: user_id,
                },
                relations: [ 'recipes', 'recipes.recipe_category']
            }
        );
        return userDetails;
    }

    async editUser(dto: SignupDto, accessToken: string){
        const tokenData = this.jwtUtilService.getTokenData(accessToken);

        if(!tokenData){
            throw new NotFoundException('Wrong Jwt Token');
        }

        const user = await this.userRepository.findOne({ where: { user_id: tokenData.user_id } });

        if(!user){
            throw new NotFoundException('User not found');
        }

        user.user_name = dto.user_name;
        user.user_lastname = dto.user_lastname;
        user.user_email = dto.user_email;

        await this.userRepository.save(user);

    }
    

}

