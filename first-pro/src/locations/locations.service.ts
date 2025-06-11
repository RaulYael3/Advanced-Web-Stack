import { Injectable } from '@nestjs/common'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Location } from './entities/location.entity'
import { Manager } from 'src/managers/entities/manager.entity'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto)
    const savedLocation = this.locationRepository.save(location)
    return savedLocation
  }

  async findAll() {
    return await this.locationRepository.find()
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    })
    if (!location) throw new Error(`Location with id ${id} not found`)
    return location
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location: undefined })
      .where('locationId = :id', { id })
      .execute()

    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    if (!location) throw new Error(`Location with id ${id} not found`)
    const savedLocation = await this.locationRepository.save(location)

    const updated = await this.managerRepository.preload({
      managerId: updateLocationDto.manager?.managerId,
      location: location,
    })
    if (!updated)
      throw new Error(
        `Manager with id ${updateLocationDto.manager?.managerId} not found`,
      )
    await this.managerRepository.save(updated)

    return savedLocation
  }

  remove(id: number) {
    return this.locationRepository.delete({ locationId: id })
  }
}
