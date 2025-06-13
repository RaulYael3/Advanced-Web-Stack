import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { CreateRoomDto } from './dto/create-room.dto'
import { UpdateRoomDto } from './dto/update-room.dto'
import { CreateRoomScreeningDto } from './dto/create-room-screening.dto'
import { UpdateRoomScreeningDto } from './dto/update-room-screening.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { Room } from './entities/room.entity'
import { RoomScreening } from './entities/room-screening.entity'

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva sala' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({ status: 201, description: 'La sala ha sido creada exitosamente.', type: Room })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las salas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las salas.', type: [Room] })
  findAll() {
    return this.roomsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sala por ID' })
  @ApiParam({ name: 'id', description: 'ID de la sala' })
  @ApiResponse({ status: 200, description: 'La sala encontrada.', type: Room })
  @ApiResponse({ status: 404, description: 'Sala no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una sala' })
  @ApiParam({ name: 'id', description: 'ID de la sala' })
  @ApiBody({ type: UpdateRoomDto })
  @ApiResponse({
    status: 200,
    description: 'La sala ha sido actualizada exitosamente.',
    type: Room
  })
  @ApiResponse({ status: 404, description: 'Sala no encontrada.' })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una sala' })
  @ApiParam({ name: 'id', description: 'ID de la sala' })
  @ApiResponse({ status: 200, description: 'La sala ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada.' })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id)
  }

  // RoomScreening endpoints
  @Post('screenings')
  @ApiOperation({ summary: 'Crear una nueva relación sala-función' })
  @ApiBody({ type: CreateRoomScreeningDto })
  @ApiResponse({
    status: 201,
    description: 'La relación ha sido creada exitosamente.',
    type: RoomScreening
  })
  createRoomScreening(@Body() createRoomScreeningDto: CreateRoomScreeningDto) {
    return this.roomsService.createRoomScreening(createRoomScreeningDto)
  }

  @Get('screenings')
  @ApiOperation({ summary: 'Obtener todas las relaciones sala-función' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las relaciones.',
    type: [RoomScreening]
  })
  findAllRoomScreenings() {
    return this.roomsService.findAllRoomScreenings()
  }

  @Get('screenings/:id')
  @ApiOperation({ summary: 'Obtener una relación sala-función por ID' })
  @ApiParam({ name: 'id', description: 'ID de la relación' })
  @ApiResponse({ status: 200, description: 'La relación encontrada.', type: RoomScreening })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  findOneRoomScreening(@Param('id') id: string) {
    return this.roomsService.findOneRoomScreening(+id)
  }

  @Patch('screenings/:id')
  @ApiOperation({ summary: 'Actualizar una relación sala-función' })
  @ApiParam({ name: 'id', description: 'ID de la relación' })
  @ApiBody({ type: UpdateRoomScreeningDto })
  @ApiResponse({
    status: 200,
    description: 'La relación ha sido actualizada exitosamente.',
    type: RoomScreening
  })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  updateRoomScreening(
    @Param('id') id: string,
    @Body() updateRoomScreeningDto: UpdateRoomScreeningDto
  ) {
    return this.roomsService.updateRoomScreening(+id, updateRoomScreeningDto)
  }

  @Delete('screenings/:id')
  @ApiOperation({ summary: 'Eliminar una relación sala-función' })
  @ApiParam({ name: 'id', description: 'ID de la relación' })
  @ApiResponse({ status: 200, description: 'La relación ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  removeRoomScreening(@Param('id') id: string) {
    return this.roomsService.removeRoomScreening(+id)
  }
}
