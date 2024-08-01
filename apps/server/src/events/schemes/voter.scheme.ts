import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IVoter, Selection } from 'types';

@Schema()
export class Voter implements IVoter {
    @Prop()
    contactMethod: 'sms' | 'email';

    @Prop()
    contactValue: string;

    @Prop()
    didVote: boolean;

    @Prop({ type: Map, of: [String], default: {} })
    selection: Selection;
}

export const VoterScheme = SchemaFactory.createForClass(Voter); // split scheme
