import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventsModule } from '../events/events.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
    imports: [
        EventsModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('auth.secret'),
                signOptions: { expiresIn: '1d' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
})
export class AuthModule {}
