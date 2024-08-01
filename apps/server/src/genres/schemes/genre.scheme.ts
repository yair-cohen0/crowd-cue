import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IGenre } from 'types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({
    collection: 'genres',
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            ret.picture = Buffer.from(ret.picture).toString('base64');
            delete ret._id;
        },
    },
})
export class Genre implements Omit<IGenre, 'id'> {
    @ApiProperty()
    @IsString()
    @Prop()
    name: string;

    @ApiProperty({ format: 'binary', type: 'string' })
    @Prop({ type: Buffer })
    picture: Buffer;
}

export const GenreScheme = SchemaFactory.createForClass(Genre);
