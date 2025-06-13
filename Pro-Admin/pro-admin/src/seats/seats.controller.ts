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
@UsePipes(new ValidationPipe({ transform: true }))
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {
    console.log('SeatsController instantiated with service:', !!seatsService)
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo asiento' })
  @ApiResponse({ status: 201, description: 'Asiento creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createSeatDto: CreateSeatDto) {
    console.log('SeatsController.create called with:', createSeatDto)
    console.log('Service available:', !!this.seatsService)

    try {
      const result = await this.seatsService.create(createSeatDto)
      console.log('Controller result:', result)
      return result
    } catch (error) {
      console.error('Error in controller:', error)
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
  @ApiOperation({ summary: 'Actualizar un asiento' })
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
}
