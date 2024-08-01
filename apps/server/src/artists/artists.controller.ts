import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ArtistDocument } from './schemes/artist.scheme';
import { SpotifyService } from '../spotify/spotify.service';
import { IArtist } from 'types';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
    constructor(
        private readonly artistsService: ArtistsService,
        private readonly spotifyService: SpotifyService,
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() createArtistDto: CreateArtistDto): Promise<ArtistDocument> {
        return this.artistsService.create(createArtistDto);
    }

    @ApiQuery({ name: 'name', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @Get()
    findAll(
        @Query('name') name: string,
        @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
        @Query('skip', new ParseIntPipe({ optional: true })) skip: number,
    ): Promise<ArtistDocument[]> {
        if (name) {
            return this.artistsService.findByName(name, skip, limit);
        }
        return this.artistsService.findAll(skip, limit);
    }

    @ApiQuery({ name: 'name', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @Get('/spotify')
    async spotifyFindByName(
        @Query('name') name: string,
        @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
        @Query('skip', new ParseIntPipe({ optional: true })) skip: number,
    ): Promise<Omit<IArtist, 'id'>[]> {
        const artists = (await this.spotifyService.findByName(name, skip, limit)).map(
            this.artistsService.parseSpotifyArtist,
        );

        this.artistsService.bulkCreate(artists).catch(console.error);

        return artists;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ArtistDocument> {
        const doc = await this.artistsService.findOne(id);
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto): Promise<ArtistDocument> {
        const doc = await this.artistsService.update(id, updateArtistDto);
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<ArtistDocument> {
        return this.artistsService.remove(id);
    }
}
