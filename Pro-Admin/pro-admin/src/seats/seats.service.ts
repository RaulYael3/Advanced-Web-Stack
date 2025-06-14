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
    console.log('=== SEATS SERVICE CREATE ===')
    console.log('DTO received in service:', createSeatDto)

    const seatCount = parseInt(createSeatDto.code)

    if (!createSeatDto.row || !seatCount || !createSeatDto.roomId) {
      throw new Error('Missing required fields: code, row, roomId')
    }

    try {
      const room = await this.roomsService.findOne(createSeatDto.roomId)
      console.log('Room found:', room?.name)

      // Verificar si ya existen asientos en esa fila
      const existingSeats = await this.seatRepository.find({
        where: {
          row: createSeatDto.row.trim().toUpperCase(),
          room: { id: createSeatDto.roomId }
        }
      })

      if (existingSeats.length > 0) {
        throw new Error(`La fila ${createSeatDto.row} ya existe en esta sala`)
      }

      // Crear múltiples asientos individuales
      const seats: Seat[] = []
      for (let i = 1; i <= seatCount; i++) {
        const seat = this.seatRepository.create({
          seatNumber: i,
          row: createSeatDto.row.trim().toUpperCase(),
          isOccupied: false,
          room
        })
        seats.push(seat)
      }

      const savedSeats = await this.seatRepository.save(seats)
      console.log('Individual seats created:', savedSeats.length)

      return {
        message: `${savedSeats.length} asientos creados exitosamente en la fila ${createSeatDto.row}`,
        seats: savedSeats,
        rowCreated: createSeatDto.row.trim().toUpperCase(),
        seatCount: savedSeats.length
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

  // Método para obtener asientos específicos de una función
  async getSeatsForScreening(screeningId: number) {
    console.log('Getting seats for screening ID:', screeningId)

    try {
      // Obtener las salas asociadas a esta función
      const roomScreenings = await this.seatRepository.manager
        .createQueryBuilder()
        .select(['rs.room_id as roomId'])
        .from('room_screenings', 'rs')
        .where('rs.screening_id = :screeningId', { screeningId })
        .getRawMany()

      const roomIds = roomScreenings.map((rs) => rs.roomId)
      console.log('Room IDs for screening:', roomIds)

      if (roomIds.length === 0) {
        return []
      }

      // Obtener todos los asientos de esas salas
      const seats = await this.seatRepository
        .createQueryBuilder('seat')
        .leftJoinAndSelect('seat.room', 'room')
        .where('seat.room_id IN (:...roomIds)', { roomIds })
        .orderBy('seat.row', 'ASC')
        .addOrderBy('seat.seatNumber', 'ASC')
        .getMany()

      console.log('Found seats for screening:', seats.length)
      return seats
    } catch (error) {
      console.error('Error getting seats for screening:', error)
      throw error
    }
  }

  // Método para obtener asientos individuales de todas las filas
  async getIndividualSeats() {
    return await this.seatRepository.find({
      relations: ['room'],
      order: {
        row: 'ASC',
        seatNumber: 'ASC'
      }
    })
  }

  // Método para actualizar el estado de ocupación de un asiento específico por ID
  async updateSeatOccupancy(seatId: number, isOccupied: boolean) {
    const seat = await this.findOne(seatId)
    seat.isOccupied = isOccupied
    return await this.seatRepository.save(seat)
  }

  // Método adicional para actualizar por fila y número de asiento
  async updateSeatOccupancyByRowAndNumber(row: string, seatNumber: number, isOccupied: boolean) {
    const seat = await this.seatRepository.findOne({
      where: {
        row: row.toUpperCase(),
        seatNumber: seatNumber
      },
      relations: ['room']
    })

    if (!seat) {
      throw new Error(`Seat ${seatNumber} not found in row ${row}`)
    }

    seat.isOccupied = isOccupied
    return await this.seatRepository.save(seat)
  }
}
