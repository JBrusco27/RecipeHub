import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

export class JwtAuthGuard extends AuthGuard('jwt') {
	handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
		if (info instanceof JsonWebTokenError) {
			throw new UnauthorizedException('Invalid JWT');
		}
		return super.handleRequest(err, user, info, context, status);
	}
}
