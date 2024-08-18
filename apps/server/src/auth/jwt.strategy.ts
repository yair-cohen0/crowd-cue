import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    return req?.cookies.access_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('auth.secret'),
            passReqToCallback: true,
        });
    }

    validate(request, { token }) {
        const adminToken = this.configService.get('auth.adminToken');
        if (adminToken && adminToken === token) {
            return true;
        }

        if (token !== request.params.token) {
            throw new UnauthorizedException();
        }
        return this.authService.validateToken(token);
    }
}
