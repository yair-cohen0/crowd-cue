import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDocument } from './schemes/event.scheme';
import { ApiTags } from '@nestjs/swagger';
import { AddVotersDto } from './dto/add-voters.dto';
import { ValidateObjectIdPipe } from '../pipes/validate-object-id/validate-object-id-pipe.service';

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

    @Get('token/:token')
    findByToken(@Param('token') token: string): Promise<Pick<EventDocument, 'id' | 'genres' | 'name' | 'color'>> {
        return this.eventsService.findByToken(token);
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
