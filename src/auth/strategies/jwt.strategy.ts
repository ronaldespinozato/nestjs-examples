import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {    
    private readonly logger = new Logger(JwtStrategy.name);
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
        });
    }

    /**
     * After token was verified (it is valid and it has not expired)
     * the payload is sent here to validate payload data.
     * See how the payload was created when the token was created.
     * Response will be added in: req.user
     * @param payload 
     */
    async validate(payload: any) {
        this.logger.log("validate user, check if it exists...or create an object and send it to action method.");
        return { 
            userId: payload.sub, 
            username: payload.username,
            type: payload.type 
        };
    }
}