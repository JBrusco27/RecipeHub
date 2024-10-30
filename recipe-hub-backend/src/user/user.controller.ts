import { Body, Controller, Get, Headers, Param, ParseIntPipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}
    
    @Post('signup')
    async signup(@Body() dto: SignupDto){
        return await this.userService.signup(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('edit')
    async editUser(
        @Body() dto: SignupDto,
        @Headers('Authorization') accessToken: string
        
    ){
        return await this.userService.editUser(dto, accessToken);
    }


    @Post('upload-image')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/userprofileimage',
            filename(req, file, callback) {
                const unique = Date.now() + '_' + Math.round(Math.random() * 1e9)
                callback(null, `user_profile_image_${unique}.png`)
            },
        })
        
    }))
    uploadImage(
        @UploadedFile() file: Express.Multer.File,
    ) {
        return file;
    }

    @Get('user-profile-image/:filename')
    getFile(@Res() res: Response, @Param('filename') filename: string) {
        const filePath = path.join(__dirname, '..', '..', 'uploads/userprofileimage', filename);
        
        return res.sendFile(filePath);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) user_id: number){
        return await this.userService.getUserDetails(user_id);
    }
    

}
