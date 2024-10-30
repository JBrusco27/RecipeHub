import { Body, Controller, Get, Post, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}
    
    @Post('login')
    login(@Body() body: LoginDto){
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('isLogged')
    isLoggedIn(): boolean {
        return true
    }

}
