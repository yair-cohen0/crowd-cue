import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IArtist } from 'types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({
    collection: 'artists',
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
    },
})
export class Artist implements Omit<IArtist, 'id'> {
    @ApiProperty()
    @IsString()
    @Prop()
    name: string;

    @ApiProperty()
    @IsString()
    @Prop()
    picture: string;

    @ApiProperty()
    @IsString()
    @Prop()
    spotifyId: string;

    @ApiProperty()
    @IsArray()
    @Prop([String])
    genres: string[];

    @ApiProperty()
    @IsArray()
    @Prop()
    popularity: number;
}

export const ArtistScheme = SchemaFactory.createForClass(Artist);
