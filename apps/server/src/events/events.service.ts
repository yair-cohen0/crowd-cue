import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { _Event, EventDocument } from './schemes/event.scheme';
import { AddVotersDto } from './dto/add-voters.dto';
import { IVoter } from 'types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EventsService {
    constructor(@InjectModel(_Event.name) private eventModel: Model<_Event>) {}

    create(createEventDto: CreateEventDto): Promise<EventDocument> {
        return this.eventModel.create(createEventDto);
    }

    findByToken(token: string): Promise<Pick<EventDocument, 'id' | 'name' | 'color' | 'genres'>> {
        return this.eventModel.findOne(
            { [`voters.${token}`]: { $exists: true } },
            { name: true, color: true, genres: true },
        );
    }

    async addVoters(id: string, addVotersDto: AddVotersDto): Promise<void> {
        const event = await this.eventModel.findById(id);
        if (!event) {
            throw new NotFoundException();
        }

        const existingValues: string[] = Array.from(event.voters.values()).map((voter) => voter.contactValue);

        for (const contactInfo of addVotersDto.contacts) {
            if (!existingValues.includes(contactInfo)) {
                event.voters.set(uuidv4(), this.createVoter(addVotersDto.contactMethod, contactInfo));
            }
        }
        event.save();
    }

    private createVoter(contactMethod: IVoter['contactMethod'], contactValue: IVoter['contactValue']): IVoter {
        return {
            contactValue,
            contactMethod,
            didVote: false,
            selection: {},
        };
    }

    findAll(): Promise<EventDocument[]> {
        return this.eventModel.find();
    }

    findOne(id: string): Promise<EventDocument> {
        return this.eventModel.findById(id);
    }

    update(id: string, updateEventDto: UpdateEventDto): Promise<EventDocument> {
        return this.eventModel.findByIdAndUpdate(id, updateEventDto, {
            returnDocument: 'after',
        });
    }

    remove(id: string): Promise<EventDocument> {
        return this.eventModel.findByIdAndDelete(id);
    }
}
