import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			secretOrKey: process.env.JWT_ACCESS_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	validate(payload: any) {
		return { user_id: payload.user_id };
	}
}
