import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IEvent, IVoter, SelectionTypes } from 'types';
import { VoterScheme } from './voter.scheme';

export type EventDocument = HydratedDocument<_Event>;

@Schema({
    collection: 'events',
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
    },
})
export class _Event implements Omit<IEvent, 'id'> {
    @Prop()
    name: string;

    @Prop()
    color: string;

    @Prop([String])
    genres: string[];

    @Prop({ type: Map, of: VoterScheme, default: {} })
    voters: Record<string, IVoter>;

    @Prop({ type: Map, of: { type: Map, of: Number }, default: { artists: [], genres: [] } })
    votes: { [key in SelectionTypes]: Record<string, number> };
}

export const EventScheme = SchemaFactory.createForClass(_Event);
