import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva película' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string' },
        duration: { type: 'number' },
        synopsis: { type: 'string' },
        classification: { type: 'string' },
        genre: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createMovieDto: CreateMovieDto, @UploadedFile() file: Express.Multer.File) {
    return this.moviesService.create(createMovieDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las películas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las películas.', type: [Movie] })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una película por ID' })
  @ApiResponse({ status: 200, description: 'La película encontrada.', type: Movie })
  @ApiResponse({ status: 404, description: 'Película no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una película' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string' },
        duration: { type: 'number' },
        synopsis: { type: 'string' },
        classification: { type: 'string' },
        genre: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.moviesService.update(+id, updateMovieDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una película' })
  @ApiResponse({ status: 200, description: 'La película ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Película no encontrada.' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
