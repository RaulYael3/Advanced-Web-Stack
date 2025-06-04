import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Region } from './entities/region.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    const region = this.regionRepository.create(createRegionDto)
    const savedRegion = this.regionRepository.save(region)
    return savedRegion
  }

  findAll() {
    return this.regionRepository.find()
  }

  async findOne(id: number) {
    const region = await this.regionRepository.findOneBy({
      regionId: id,
    })

    if (!region) throw new NotFoundException('Region not found')
    return region
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto,
    })
    if (!regionToUpdate) throw new BadRequestException()
    return this.regionRepository.save(regionToUpdate)
  }

  remove(id: number) {
    return this.regionRepository.delete({
      regionId: id,
    })
  }
}
