import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateScreeningDto } from './dto/create-screening.dto'
import { UpdateScreeningDto } from './dto/update-screening.dto'
import { Screening } from './entities/screening.entity'
import { Movie } from '../movies/entities/movie.entity'

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectRepository(Screening)
    private screeningRepository: Repository<Screening>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ) {}

  async create(createScreeningDto: CreateScreeningDto) {
    const movie = await this.movieRepository.findOne({
      where: { id: createScreeningDto.movieId }
    })

    if (!movie) {
      throw new NotFoundException('Movie not found')
    }

    const screening = this.screeningRepository.create({
      datetime: createScreeningDto.datetime,
      movie
    })

    return await this.screeningRepository.save(screening)
  }

  async findAll() {
    return await this.screeningRepository.find({
      relations: ['movie', 'roomScreenings', 'roomScreenings.room']
    })
  }

  async findOne(id: number) {
    const screening = await this.screeningRepository.findOne({
      where: { id },
      relations: ['movie', 'roomScreenings', 'roomScreenings.room', 'tickets']
    })

    if (!screening) {
      throw new NotFoundException('Screening not found')
    }

    return screening
  }

  async update(id: number, updateScreeningDto: UpdateScreeningDto) {
    const screening = await this.findOne(id)

    if (updateScreeningDto.movieId) {
      const movie = await this.movieRepository.findOne({
        where: { id: updateScreeningDto.movieId }
      })
      if (!movie) {
        throw new NotFoundException('Movie not found')
      }
      screening.movie = movie
    }

    Object.assign(screening, updateScreeningDto)
    return await this.screeningRepository.save(screening)
  }

  async remove(id: number) {
    const screening = await this.findOne(id)
    await this.screeningRepository.remove(screening)
    return { message: 'Screening deleted successfully' }
  }
}
