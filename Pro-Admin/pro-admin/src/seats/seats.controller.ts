import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { SeatsService } from './seats.service'
import { CreateSeatDto } from './dto/create-seat.dto'
import { UpdateSeatDto } from './dto/update-seat.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {
    console.log('SeatsController instantiated')
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false
    })
  )
  @ApiOperation({ summary: 'Crear fila de asientos' })
  @ApiResponse({ status: 201, description: 'Fila de asientos creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createSeatDto: CreateSeatDto) {
    console.log('=== BACKEND CREATE SEAT ROW ===')
    console.log('DTO received:', createSeatDto)

    try {
      const result = await this.seatsService.create(createSeatDto)
      console.log('Controller success result:', result)
      return result
    } catch (error) {
      console.error('Controller error:', error)
      throw error
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los asientos' })
  findAll(@Query('roomId') roomId?: string) {
    if (roomId) {
      console.log('Finding seats for room:', roomId)
      return this.seatsService.findByRoom(+roomId)
    }
    return this.seatsService.findAll()
  }

  @Get('all-with-occupancy')
  @ApiOperation({ summary: 'Obtener todos los asientos con estado de ocupación' })
  @ApiResponse({ status: 200, description: 'Lista de todos los asientos con estado' })
  async getAllSeatsWithOccupancy() {
    return this.seatsService.getAllSeatsWithOccupancy()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un asiento por ID' })
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un asiento individual' })
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatsService.update(+id, updateSeatDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un asiento' })
  remove(@Param('id') id: string) {
    return this.seatsService.remove(+id)
  }

  @Get('by-room/:roomId')
  @ApiOperation({ summary: 'Obtener asientos por sala' })
  findByRoom(@Param('roomId') roomId: string) {
    console.log('Finding seats for room ID:', roomId)
    return this.seatsService.findByRoom(+roomId)
  }

  @Get('screening/:screeningId')
  @ApiOperation({ summary: 'Obtener asientos para una función específica' })
  @ApiResponse({ status: 200, description: 'Asientos de la función' })
  async getSeatsForScreening(@Param('screeningId') screeningId: string) {
    console.log('Getting seats for screening:', screeningId)
    return this.seatsService.getSeatsForScreening(+screeningId)
  }

  @Get('individual')
  @ApiOperation({ summary: 'Obtener todos los asientos individuales' })
  async getIndividualSeats() {
    return this.seatsService.getIndividualSeats()
  }

  @Patch(':row/:seatNumber/occupancy')
  @ApiOperation({ summary: 'Actualizar estado de ocupación de un asiento' })
  async updateSeatOccupancy(
    @Param('row') row: string,
    @Param('seatNumber') seatNumber: string,
    @Body('isOccupied') isOccupied: boolean
  ) {
    return this.seatsService.updateSeatOccupancy(row, +seatNumber, isOccupied)
  }
}
