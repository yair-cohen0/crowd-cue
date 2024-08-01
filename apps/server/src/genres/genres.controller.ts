import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GenreDocument } from './schemes/genre.scheme';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('picture'))
    async create(
        @Body() createGenreDto: CreateGenreDto,
        @UploadedFile() picture: Express.Multer.File,
    ): Promise<GenreDocument> {
        createGenreDto.picture = picture.buffer;
        return await this.genresService.create(createGenreDto);
    }

    @ApiQuery({ name: 'name', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'skip', required: false })
    @Get()
    findAll(
        @Query('name') name: string,
        @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
        @Query('skip', new ParseIntPipe({ optional: true })) skip: number,
    ): Promise<GenreDocument[]> {
        if (name) {
            return this.genresService.findByName(name, skip, limit);
        }
        return this.genresService.findAll(skip, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<GenreDocument> {
        const doc = await this.genresService.findOne(id);
        if (!doc) {
            throw new NotFoundException();
        }
        return doc;
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('picture'))
    update(
        @Param('id') id: string,
        @Body() updateGenreDto: UpdateGenreDto,
        @UploadedFile() picture: Express.Multer.File,
    ): Promise<GenreDocument> {
        updateGenreDto.picture = picture?.buffer;
        return this.genresService.update(id, updateGenreDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<GenreDocument> {
        return this.genresService.remove(id);
    }
}
