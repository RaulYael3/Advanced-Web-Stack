import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSeatDto } from './dto/create-seat.dto'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { Seat } from './entities/seat.entity'
import { RoomsService } from '../rooms/rooms.service'

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    private roomsService: RoomsService
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const room = await this.roomsService.findOne(createSeatDto.roomId)

    const seat = this.seatRepository.create({
      code: createSeatDto.code,
      row: createSeatDto.row,
      room
    })

    return await this.seatRepository.save(seat)
  }

  async findAll() {
    return await this.seatRepository.find({
      relations: ['room']
    })
  }

  async findOne(id: number) {
    const seat = await this.seatRepository.findOne({
      where: { id },
      relations: ['room', 'tickets']
    })

    if (!seat) {
      throw new NotFoundException('Seat not found')
    }

    return seat
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    const seat = await this.findOne(id)

    if (updateSeatDto.roomId) {
      const room = await this.roomsService.findOne(updateSeatDto.roomId)
      seat.room = room
    }

    Object.assign(seat, updateSeatDto)
    return await this.seatRepository.save(seat)
  }

  async remove(id: number) {
    const seat = await this.findOne(id)
    await this.seatRepository.remove(seat)
    return { message: 'Seat deleted successfully' }
  }

  async findByRoom(roomId: number) {
    return await this.seatRepository.find({
      where: { room: { id: roomId } },
      relations: ['room']
    })
  }
}
