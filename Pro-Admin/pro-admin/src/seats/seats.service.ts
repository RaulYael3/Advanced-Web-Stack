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
    console.log('Creating seats with data:', createSeatDto)

    try {
      const room = await this.roomsService.findOne(createSeatDto.roomId)

      // Crear múltiples asientos individuales
      const seats = []
      for (let i = 1; i <= createSeatDto.seatCount; i++) {
        const seat = this.seatRepository.create({
          seatNumber: i,
          row: createSeatDto.row,
          isOccupied: false, // Por defecto no ocupado
          room
        })
        seats.push(seat)
      }

      const savedSeats = await this.seatRepository.save(seats)
      console.log('Seats created successfully:', savedSeats.length)

      return {
        message: `${savedSeats.length} asientos creados exitosamente`,
        seats: savedSeats
      }
    } catch (error) {
      console.error('Error in SeatsService.create:', error)
      throw error
    }
  }

  async findAll() {
    return await this.seatRepository.find({
      relations: ['room'],
      order: {
        row: 'ASC',
        seatNumber: 'ASC'
      }
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
      relations: ['room'],
      order: {
        row: 'ASC',
        seatNumber: 'ASC'
      }
    })
  }

  async updateSeatOccupancy(seatId: number, isOccupied: boolean) {
    const seat = await this.findOne(seatId)
    seat.isOccupied = isOccupied
    return await this.seatRepository.save(seat)
  }

  // Método simple para obtener todos los asientos con su estado actual
  async getAllSeatsWithOccupancy() {
    return await this.seatRepository.find({
      relations: ['room'],
      order: {
        room: { id: 'ASC' },
        row: 'ASC',
        seatNumber: 'ASC'
      }
    })
  }
}
