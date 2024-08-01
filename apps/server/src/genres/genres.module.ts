import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreScheme } from './schemes/genre.scheme';

@Module({
    imports: [MongooseModule.forFeature([{ name: Genre.name, schema: GenreScheme }])],
    controllers: [GenresController],
    providers: [GenresService],
})
export class GenresModule {}
