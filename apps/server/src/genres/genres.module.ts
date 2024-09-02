import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreScheme } from './schemes/genre.scheme';
import { EventsModule } from '../events/events.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Genre.name, schema: GenreScheme }]), EventsModule, AuthModule],
    controllers: [GenresController],
    providers: [GenresService],
})
export class GenresModule {}
