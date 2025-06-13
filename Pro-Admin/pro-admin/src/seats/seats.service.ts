import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common'
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
    @Inject(forwardRef(() => RoomsService))
    private roomsService: RoomsService
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    console.log('SeatsService.create called with:', createSeatDto)

    try {
      const room = await this.roomsService.findOne(createSeatDto.roomId)
      console.log('Room found:', room)

      const seat = this.seatRepository.create({
        code: createSeatDto.code,
        row: createSeatDto.row,
        room
      })

      console.log('Seat entity created:', seat)

      const savedSeat = await this.seatRepository.save(seat)
      console.log('Seat saved:', savedSeat)

      return savedSeat
    } catch (error) {
      console.error('Error in SeatsService.create:', error)
      throw error
    }
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
