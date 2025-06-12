import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomScreeningDto } from './dto/create-room-screening.dto';
import { UpdateRoomScreeningDto } from './dto/update-room-screening.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Return all rooms.' })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by id' })
  @ApiResponse({ status: 200, description: 'Return the room.' })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a room' })
  @ApiResponse({ status: 200, description: 'The room has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiResponse({ status: 200, description: 'The room has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }

  // RoomScreening endpoints
  @Post('screenings')
  @ApiOperation({ summary: 'Create a new room-screening relationship' })
  @ApiResponse({ status: 201, description: 'The room-screening relationship has been successfully created.' })
  createRoomScreening(@Body() createRoomScreeningDto: CreateRoomScreeningDto) {
    return this.roomsService.createRoomScreening(createRoomScreeningDto);
  }

  @Get('screenings')
  @ApiOperation({ summary: 'Get all room-screening relationships' })
  @ApiResponse({ status: 200, description: 'Return all room-screening relationships.' })
  findAllRoomScreenings() {
    return this.roomsService.findAllRoomScreenings();
  }

  @Get('screenings/:id')
  @ApiOperation({ summary: 'Get a room-screening relationship by id' })
  @ApiResponse({ status: 200, description: 'Return the room-screening relationship.' })
  findOneRoomScreening(@Param('id') id: string) {
    return this.roomsService.findOneRoomScreening(+id);
  }

  @Patch('screenings/:id')
  @ApiOperation({ summary: 'Update a room-screening relationship' })
  @ApiResponse({ status: 200, description: 'The room-screening relationship has been successfully updated.' })
  updateRoomScreening(
    @Param('id') id: string,
    @Body() updateRoomScreeningDto: UpdateRoomScreeningDto,
  ) {
    return this.roomsService.updateRoomScreening(+id, updateRoomScreeningDto);
  }

  @Delete('screenings/:id')
  @ApiOperation({ summary: 'Delete a room-screening relationship' })
  @ApiResponse({ status: 200, description: 'The room-screening relationship has been successfully deleted.' })
  removeRoomScreening(@Param('id') id: string) {
    return this.roomsService.removeRoomScreening(+id);
  }
}
