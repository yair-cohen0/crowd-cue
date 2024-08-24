import { Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post(':token')
    async auth(@Param('token') token: string, @Res({ passthrough: true }) res: Response): Promise<void> {
        await this.authService.validateToken(token);
        const signedToken = this.authService.signToken(token);

        const isDev = this.configService.get('env') === 'development';
        const oneDay = 1 * 24 * 60 * 1000;
        res.cookie('access_token', signedToken, {
            httpOnly: true,
            secure: false,
            sameSite: isDev ? 'lax' : 'strict',
            expires: new Date(Date.now() + oneDay),
        });
    }
}
