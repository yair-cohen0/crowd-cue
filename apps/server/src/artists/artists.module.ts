import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Artist, ArtistScheme } from './schemes/artist.scheme';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotifyModule } from '../spotify/spotify.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistScheme }]), SpotifyModule],
    controllers: [ArtistsController],
    providers: [ArtistsService],
})
export class ArtistsModule {}
