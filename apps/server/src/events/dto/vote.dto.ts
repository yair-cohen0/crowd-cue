import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { SelectionObject } from 'types';

export class VoteDto implements SelectionObject {
    @ApiProperty({})
    @IsArray({})
    @IsString({ each: true })
    artists: string[];

    @ApiProperty({})
    @IsArray({})
    @IsString({ each: true })
    genres: string[];
}
