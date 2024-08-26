import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class VoteDto {
    @ApiProperty({})
    @IsArray({})
    @IsString({ each: true })
    artists: string[];

    @ApiProperty({})
    @IsArray({})
    @IsString({ each: true })
    genres: string[];
}
