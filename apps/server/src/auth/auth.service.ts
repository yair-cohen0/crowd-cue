import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventsService } from '../events/events.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly eventsService: EventsService,
        private readonly jwtService: JwtService,
    ) {}

    async validateToken(token: string): Promise<boolean> {
        const adminToken = this.configService.get('auth.adminToken');

        const isAuth = (adminToken && adminToken === token) || (await this.eventsService.isTokenValid(token));
        if (!isAuth) {
            throw new UnauthorizedException();
        }
        return true;
    }

    signToken(token: string): string {
        return this.jwtService.sign({ token });
    }
}
