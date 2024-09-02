import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDocument } from './schemes/event.scheme';
import { ApiTags } from '@nestjs/swagger';
import { AddVotersDto } from './dto/add-voters.dto';
import { ValidateObjectIdPipe } from '../pipes/validate-object-id/validate-object-id-pipe.service';
import { VoteDto } from './dto/vote.dto';
import { Token } from '../auth/token.decorator';
import { Response } from 'express';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    create(@Body() createEventDto: CreateEventDto): Promise<EventDocument> {
        return this.eventsService.create(createEventDto);
    }

    @Post('vote')
    async vote(
        @Token() token: string,
        @Body() voteDto: VoteDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<void> {
        await this.eventsService.vote(token, voteDto);
        res.cookie('access_token', '');
    }

    @Put('/voters:id')
    async addVoters(@Param('id', ValidateObjectIdPipe) id: string, @Body() addVotersDto: AddVotersDto): Promise<void> {
        await this.eventsService.addVoters(id, addVotersDto);
    }

    @Get('token')
    async findByToken(@Token() token: string): Promise<Partial<EventDocument>> {
        return await this.eventsService.findByToken(token, {
            id: true,
            name: true,
            color: true,
            genres: true,
        });
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
