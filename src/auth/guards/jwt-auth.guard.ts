import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);
    /**
     * It will be called after token was verified and payload build to action methods.
     * First action executed: JwtStrategy.validate(payload)
     * Second action this method is executed.
     * If token validation fail, this method still wil be executed but err and info should display the reason.
     * @param err 
     * @param user 
     * @param info 
     * @param context 
     */
    handleRequest(err, user, info, context) {        
        if(err || info) {
            this.logger.error(`${info}`, err);
            throw new UnauthorizedException("Unauthorized, Does not possible to continue with the request.");
        }
        this.logger.log(`This section can be used to validate authorization`);
        return user;
    }
}