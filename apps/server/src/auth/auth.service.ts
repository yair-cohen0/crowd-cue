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

    async validateToken(token: string): Promise<{ token: string }> {
        const isAuth = this.isAdmin(token) || (await this.eventsService.isTokenValid(token));
        if (!isAuth) {
            throw new UnauthorizedException();
        }
        return { token };
    }

    isAdmin(token: string): boolean {
        const adminToken = this.configService.get('auth.adminToken');
        return adminToken && adminToken === token;
    }

    signToken(token: string): string {
        return this.jwtService.sign({ token });
    }
}
