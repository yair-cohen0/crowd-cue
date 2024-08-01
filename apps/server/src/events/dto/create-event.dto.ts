import { _Event } from '../schemes/event.scheme';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateEventDto implements Pick<_Event, 'name' | 'genres' | 'color'> {
    @ApiProperty()
    @IsString()
    color: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsArray()
    genres: string[];
}
