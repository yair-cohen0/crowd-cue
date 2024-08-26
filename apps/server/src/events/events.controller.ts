import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDocument } from './schemes/event.scheme';
import { ApiTags } from '@nestjs/swagger';
import { AddVotersDto } from './dto/add-voters.dto';
import { ValidateObjectIdPipe } from '../pipes/validate-object-id/validate-object-id-pipe.service';
import { AuthGuard } from '@nestjs/passport';
import { VoteDto } from './dto/vote.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    create(@Body() createEventDto: CreateEventDto): Promise<EventDocument> {
        return this.eventsService.create(createEventDto);
    }

    @Put('/voters:id')
    async addVoters(@Param('id', ValidateObjectIdPipe) id: string, @Body() addVotersDto: AddVotersDto): Promise<void> {
        await this.eventsService.addVoters(id, addVotersDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('token/:token')
    async findByToken(@Param('token') token: string): Promise<Partial<EventDocument>> {
        const event = await this.eventsService.findByToken(token, {
            id: true,
            name: true,
            color: true,
            genres: true,
            voters: true,
        });
        if (event?.voters.get(token).didVote) {
            throw new HttpException('Already Voted', 403);
        }

        return { id: event.id, color: event.color, genres: event.genres, name: event.name };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('vote/:token')
    vote(@Param('token') token: string, @Body() voteDto: VoteDto): Promise<void> {
        return this.eventsService.vote(token, voteDto);
    }

    @Get()
    findAll(): Promise<EventDocument[]> {
        return this.eventsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<EventDocument> {
        return this.eventsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<EventDocument> {
        return this.eventsService.update(id, updateEventDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<EventDocument> {
        return this.eventsService.remove(id);
    }
}
