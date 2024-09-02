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

    findByFilters(
        { ids, name }: Partial<{ ids: string[]; name: string }>,
        skip: number,
        limit: number,
    ): Promise<GenreDocument[]> {
        const query = this.genreModel.find();

        if (ids) {
            query.where({ _id: { $in: ids } });
        }

        if (name) {
            query.where({ name: { $regex: name, $options: 'i' } });
        }

        return query.skip(skip).limit(limit).exec();
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
