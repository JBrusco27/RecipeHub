import { Injectable, Logger} from '@nestjs/common';
import { decode } from 'jsonwebtoken';

@Injectable()
export class JwtUtilService {
	getTokenData(token: string) {
		return decode(token.replace('Bearer ', ''), { json: true });
	}
}
