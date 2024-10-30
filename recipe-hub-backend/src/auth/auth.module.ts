import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JwtUtilService } from './jwt/jwt-util.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    UserModule
  ],
  providers: [AuthService, JwtUtilService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtUtilService]
})
export class AuthModule {}
