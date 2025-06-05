import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateManagerDto } from './dto/create-manager.dto'
import { UpdateManagerDto } from './dto/update-manager.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Manager } from './entities/manager.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepositor: Repository<Manager>,
  ) {}

  create(createManagerDto: CreateManagerDto) {
    const manager = this.managerRepositor.create(createManagerDto)
    const savedManager = this.managerRepositor.save(manager)
    return savedManager
  }

  findAll() {
    return this.managerRepositor.find({ relations: { location: true } })
  }

  async findOne(id: string) {
    const manager = await this.managerRepositor.findOne({
      where: {
        managerId: id,
      },
      relations: {
        location: true,
      },
    })
    if (!manager) throw new NotFoundException('Not found that manager by ID')
    return manager
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepositor.preload({
      managerId: id,
      ...updateManagerDto,
    })

    if (!managerToUpdate) throw new BadRequestException()
    return this.managerRepositor.save(managerToUpdate)
  }

  remove(id: string) {
    return this.managerRepositor.delete({
      managerId: id,
    })
  }
}
