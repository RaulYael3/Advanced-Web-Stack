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

      // Crear el arreglo de asientos individuales
      const seatArray = []
      for (let i = 1; i <= seatCount; i++) {
        seatArray.push({
          id: i,
          seatNumber: i,
          isOccupied: false
        })
      }

      // Crear el registro con el arreglo en el campo code
      const seat = this.seatRepository.create({
        code: seatArray,
        row: createSeatDto.row.trim().toUpperCase(),
        room
      })

      const savedSeat = await this.seatRepository.save(seat)
      console.log('Seat row created successfully with', seatArray.length, 'seats')

      return {
        id: savedSeat.id,
        code: savedSeat.code,
        row: savedSeat.row,
        room: {
          id: savedSeat.room.id,
          name: savedSeat.room.name
        },
        message: `Fila ${createSeatDto.row} creada con ${seatArray.length} asientos`
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

  // Método para obtener asientos específicos de una función
  async getSeatsForScreening(screeningId: number) {
    console.log('Getting seats for screening ID:', screeningId)

    try {
      // Primero obtener la función y sus salas
      const screening = await this.seatRepository.manager
        .createQueryBuilder()
        .select(['s.id', 's.datetime'])
        .from('screenings', 's')
        .where('s.id = :screeningId', { screeningId })
        .getOne()

      if (!screening) {
        throw new Error('Screening not found')
      }

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
      const seats = await this.seatRepository.find({
        where: {
          room: {
            id: roomIds.length === 1 ? roomIds[0] : ({ $in: roomIds } as any)
          }
        },
        relations: ['room'],
        order: {
          row: 'ASC',
          seatNumber: 'ASC'
        }
      })

      console.log('Found seats for screening:', seats.length)
      return seats
    } catch (error) {
      console.error('Error getting seats for screening:', error)
      throw error
    }
  }

  // Método para obtener asientos individuales de todas las filas
  async getIndividualSeats() {
    const seatRows = await this.seatRepository.find({
      relations: ['room'],
      order: {
        row: 'ASC'
      }
    })

    const individualSeats: {
      id: string
      seatNumber: number
      row: string
      isOccupied: boolean
      room: any
      rowId: number
    }[] = []
    seatRows.forEach((seatRow) => {
      if (Array.isArray(seatRow.code)) {
        seatRow.code.forEach((seat) => {
          individualSeats.push({
            id: `${seatRow.row}${seat.seatNumber}`,
            seatNumber: seat.seatNumber,
            row: seatRow.row,
            isOccupied: seat.isOccupied,
            room: seatRow.room,
            rowId: seatRow.id
          })
        })
      }
    })

    return individualSeats
  }

  // Método para actualizar el estado de ocupación de un asiento específico
  async updateSeatOccupancy(row: string, seatNumber: number, isOccupied: boolean) {
    const seatRow = await this.seatRepository.findOne({
      where: { row: row.toUpperCase() },
      relations: ['room']
    })

    if (!seatRow) {
      throw new Error(`Row ${row} not found`)
    }

    if (Array.isArray(seatRow.code)) {
      const seatIndex = seatRow.code.findIndex((seat) => seat.seatNumber === seatNumber)
      if (seatIndex !== -1) {
        seatRow.code[seatIndex].isOccupied = isOccupied
        await this.seatRepository.save(seatRow)
        return seatRow.code[seatIndex]
      }
    }

    throw new Error(`Seat ${seatNumber} not found in row ${row}`)
  }
}
