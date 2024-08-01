import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { _Event, EventScheme } from './schemes/event.scheme';

@Module({
    imports: [MongooseModule.forFeature([{ name: _Event.name, schema: EventScheme }])],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}
