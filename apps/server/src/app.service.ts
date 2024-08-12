import { Injectable } from '@nestjs/common';
import { EventsService } from './events/events.service';

@Injectable()
export class AppService {
    constructor(private readonly eventsService: EventsService) {}

    auth(token: string): Promise<boolean> {
        return this.eventsService.isTokenValid(token);
    }
}
