import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from './schemes/genre.scheme';

@Injectable()
export class GenresService {
    constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}

    create(createGenreDto: CreateGenreDto): Promise<GenreDocument> {
        return this.genreModel.create(createGenreDto);
    }

    findAll(skip: number, limit: number): Promise<GenreDocument[]> {
        return this.genreModel.find().skip(skip).limit(limit);
    }

    findByName(name: string, skip: number, limit: number): Promise<GenreDocument[]> {
        return this.genreModel
            .find({ name: { $regex: name, $options: 'i' } })
            .skip(skip)
            .limit(limit);
    }

    findOne(id: string): Promise<GenreDocument> {
        return this.genreModel.findById(id);
    }

    update(id: string, updateGenreDto: UpdateGenreDto): Promise<GenreDocument> {
        return this.genreModel.findByIdAndUpdate(id, updateGenreDto, {
            returnDocument: 'after',
        });
    }

    remove(id: string): Promise<GenreDocument> {
        return this.genreModel.findByIdAndDelete(id);
    }
}
