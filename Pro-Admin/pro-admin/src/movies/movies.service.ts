import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Movie } from './entities/movie.entity'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { S3Service } from '../s3/s3.service'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly s3Service: S3Service
  ) {}

  async create(createMovieDto: CreateMovieDto, file?: Express.Multer.File) {
    const movie = this.movieRepository.create(createMovieDto)

    if (file) {
      const photoUrl = await this.s3Service.uploadFile(file)
      movie.photo = photoUrl
    }

    return this.movieRepository.save(movie)
  }

  findAll() {
    return this.movieRepository.find()
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } })
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`)
    }
    return movie
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, file?: Express.Multer.File) {
    const movie = await this.findOne(id)

    if (file) {
      const photoUrl = await this.s3Service.uploadFile(file)
      movie.photo = photoUrl
    }

    Object.assign(movie, updateMovieDto)
    return this.movieRepository.save(movie)
  }

  async remove(id: number) {
    const movie = await this.findOne(id)
    return this.movieRepository.remove(movie)
  }
}
