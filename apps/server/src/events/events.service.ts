import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType } from 'mongoose';
import { _Event, EventDocument } from './schemes/event.scheme';
import { AddVotersDto } from './dto/add-voters.dto';
import { IVoter, SelectionTypes } from 'types';
import { v4 as uuidv4 } from 'uuid';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class EventsService {
    constructor(@InjectModel(_Event.name) private eventModel: Model<_Event>) {}

    create(createEventDto: CreateEventDto): Promise<EventDocument> {
        return this.eventModel.create(createEventDto);
    }

    findByToken(token: string, projection?: ProjectionType<EventDocument>): Promise<Partial<EventDocument>> {
        return this.eventModel.findOne({ [`voters.${token}`]: { $exists: true } }, projection);
    }

    async vote(token: string, voteDto: VoteDto): Promise<void> {
        const event = await this.findByToken(token);

        if (!voteDto.genres.every((g) => event.genres.includes(g))) {
            throw new HttpException('Non Conforming Genres', 406);
        }

        for (const property of Object.keys(voteDto) as SelectionTypes[]) {
            for (const id of voteDto[property]) {
                const count = event.votes.get(property).get(id);
                event.votes.get(property).set(id, (count || 0) + 1);
            }
        }

        const voter = event.voters.get(token);
        voter.didVote = true;
        voter.selection.set('artists', voteDto.artists);
        voter.selection.set('genres', voteDto.genres);

        await event.save();
    }

    async isTokenValid(token: string): Promise<boolean> {
        const event = await this.eventModel
            .findOne({ [`voters.${token}`]: { $exists: true } }, { voters: true })
            .lean();

        if (!event) {
            throw new UnauthorizedException();
        } else if (event.voters[token].didVote) {
            throw new HttpException('Already Voted', 403);
        }
        return true;
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
