import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, ArtistDocument } from './schemes/artist.scheme';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IArtist } from 'types';
import * as _ from 'lodash';
import { ISpotifyArtist } from '../spotify/spotify.types';

@Injectable()
export class ArtistsService {
    constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}

    create(createArtistDto: CreateArtistDto): Promise<ArtistDocument> {
        return this.artistModel.create(createArtistDto);
    }

    findAll(skip: number, limit: number): Promise<ArtistDocument[]> {
        return this.artistModel.find().skip(skip).limit(limit);
    }

    findByName(name: string, skip: number, limit: number): Promise<ArtistDocument[]> {
        return this.artistModel
            .find({ name: { $regex: name, $options: 'i' } })
            .skip(skip)
            .limit(limit);
    }

    findOne(id: string): Promise<ArtistDocument> {
        return this.artistModel.findById(id);
    }

    update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistDocument> {
        return this.artistModel.findByIdAndUpdate(id, updateArtistDto, {
            returnDocument: 'after',
        });
    }

    remove(id: string): Promise<ArtistDocument> {
        return this.artistModel.findByIdAndDelete(id);
    }

    async bulkCreate(artists: Omit<IArtist, 'id'>[]): Promise<ArtistDocument[]> {
        const spotifyIds = artists.map((a) => a.spotifyId);
        const existing = await this.bulkFindBySpotifyId(spotifyIds);
        const newArtists = _.differenceBy(artists, existing, 'spotifyId');

        return this.artistModel.insertMany(newArtists);
    }

    bulkFindBySpotifyId(spotifyIds: string[]): Promise<ArtistDocument[]> {
        return this.artistModel.find({ spotifyId: { $in: spotifyIds } });
    }

    public parseSpotifyArtist(artist: ISpotifyArtist): Omit<IArtist, 'id'> {
        return {
            spotifyId: artist.id,
            name: artist.name,
            picture: artist.images?.[0]?.url,
            popularity: artist.popularity,
            genres: artist.genres,
        };
    }
}
