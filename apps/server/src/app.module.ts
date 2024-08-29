import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseConnectionModule } from './mongoose/mongoose.module';
import { ArtistsModule } from './artists/artists.module';
import { GenresModule } from './genres/genres.module';
import { SpotifyModule } from './spotify/spotify.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import baseConfig from './config/base';
import mongoDbConfig from './config/mongoDb';
import spotifyConfig from './config/spotify';
import authConfig from './config/auth';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'static'),
            renderPath: '/',
            serveStaticOptions: {
                index: 'index.html',
            },
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [baseConfig, mongoDbConfig, spotifyConfig, authConfig],
        }),
        MongooseConnectionModule,
        ArtistsModule,
        GenresModule,
        SpotifyModule,
        EventsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
