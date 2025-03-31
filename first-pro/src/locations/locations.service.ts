import { Injectable } from '@nestjs/common'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Location } from './entities/location.entity'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto)
    const savedLocation = this.locationRepository.save(location)
    return savedLocation
  }

  findAll() {
    return `This action returns all locations`
  }

  findOne(id: number) {
    return `This action returns a #${id} location`
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`
  }

  remove(id: number) {
    return `This action removes a #${id} location`
  }
}
