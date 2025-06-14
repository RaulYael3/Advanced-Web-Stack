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
  @ApiOperation({ summary: 'Crear asientos individuales en una fila' })
  @ApiResponse({ status: 201, description: 'Asientos creados exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createSeatDto: CreateSeatDto) {
    console.log('=== BACKEND CREATE INDIVIDUAL SEATS ===')
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

  // Rutas específicas primero, antes de las rutas con parámetros dinámicos
  @Get('all-with-occupancy')
  @ApiOperation({ summary: 'Obtener todos los asientos con estado de ocupación' })
  @ApiResponse({ status: 200, description: 'Lista de todos los asientos con estado' })
  async getAllSeatsWithOccupancy() {
    return this.seatsService.getAllSeatsWithOccupancy()
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
    try {
      // Por ahora, simplemente devolver todos los asientos
      // hasta que arreglemos la consulta compleja
      return await this.seatsService.findAll()
    } catch (error) {
      console.error('Error getting seats for screening:', error)
      throw error
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los asientos individuales' })
  findAll(@Query('roomId') roomId?: string) {
    if (roomId) {
      console.log('Finding individual seats for room:', roomId)
      return this.seatsService.findByRoom(+roomId)
    }
    return this.seatsService.findAll()
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

  @Patch(':id/occupancy')
  @ApiOperation({ summary: 'Actualizar estado de ocupación de un asiento por ID' })
  async updateSeatOccupancyById(@Param('id') id: string, @Body('isOccupied') isOccupied: boolean) {
    return this.seatsService.updateSeatOccupancy(+id, isOccupied)
  }
}
