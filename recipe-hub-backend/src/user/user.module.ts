import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
