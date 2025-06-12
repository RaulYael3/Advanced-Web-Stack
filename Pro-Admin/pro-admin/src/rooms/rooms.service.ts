import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomScreening } from './entities/room-screening.entity';
import { CreateRoomScreeningDto } from './dto/create-room-screening.dto';
import { UpdateRoomScreeningDto } from './dto/update-room-screening.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomScreening)
    private readonly roomScreeningRepository: Repository<RoomScreening>,
  ) {}

  @ApiOperation({ summary: 'Crear una nueva sala' })
  @ApiResponse({ status: 201, description: 'La sala ha sido creada exitosamente.', type: Room })
  create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  @ApiOperation({ summary: 'Obtener todas las salas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las salas.', type: [Room] })
  findAll() {
    return this.roomRepository.find();
  }

  @ApiOperation({ summary: 'Obtener una sala por ID' })
  @ApiResponse({ status: 200, description: 'La sala encontrada.', type: Room })
  @ApiResponse({ status: 404, description: 'Sala no encontrada.' })
  async findOne(id: number) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException(`Sala con ID ${id} no encontrada`);
    }
    return room;
  }

  @ApiOperation({ summary: 'Actualizar una sala' })
  @ApiResponse({ status: 200, description: 'La sala ha sido actualizada exitosamente.', type: Room })
  @ApiResponse({ status: 404, description: 'Sala no encontrada.' })
  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);
    Object.assign(room, updateRoomDto);
    return this.roomRepository.save(room);
  }

  @ApiOperation({ summary: 'Eliminar una sala' })
  @ApiResponse({ status: 200, description: 'La sala ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada.' })
  async remove(id: number) {
    const room = await this.findOne(id);
    return this.roomRepository.remove(room);
  }

  // RoomScreening methods
  @ApiOperation({ summary: 'Crear una nueva relación sala-función' })
  @ApiResponse({ status: 201, description: 'La relación ha sido creada exitosamente.', type: RoomScreening })
  createRoomScreening(createRoomScreeningDto: CreateRoomScreeningDto) {
    const roomScreening = this.roomScreeningRepository.create({
      room: { id: createRoomScreeningDto.roomId },
      screening: { id: createRoomScreeningDto.screeningId },
    });
    return this.roomScreeningRepository.save(roomScreening);
  }

  @ApiOperation({ summary: 'Obtener todas las relaciones sala-función' })
  @ApiResponse({ status: 200, description: 'Lista de todas las relaciones.', type: [RoomScreening] })
  findAllRoomScreenings() {
    return this.roomScreeningRepository.find({
      relations: ['room', 'screening'],
    });
  }

  @ApiOperation({ summary: 'Obtener una relación sala-función por ID' })
  @ApiResponse({ status: 200, description: 'La relación encontrada.', type: RoomScreening })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  async findOneRoomScreening(id: number) {
    const roomScreening = await this.roomScreeningRepository.findOne({
      where: { id },
      relations: ['room', 'screening'],
    });
    if (!roomScreening) {
      throw new NotFoundException(`Relación sala-función con ID ${id} no encontrada`);
    }
    return roomScreening;
  }

  @ApiOperation({ summary: 'Actualizar una relación sala-función' })
  @ApiResponse({ status: 200, description: 'La relación ha sido actualizada exitosamente.', type: RoomScreening })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  async updateRoomScreening(id: number, updateRoomScreeningDto: UpdateRoomScreeningDto) {
    const roomScreening = await this.findOneRoomScreening(id);
    if (updateRoomScreeningDto.roomId) {
      roomScreening.room = { id: updateRoomScreeningDto.roomId } as Room;
    }
    if (updateRoomScreeningDto.screeningId) {
      roomScreening.screening = { id: updateRoomScreeningDto.screeningId } as any;
    }
    return this.roomScreeningRepository.save(roomScreening);
  }

  @ApiOperation({ summary: 'Eliminar una relación sala-función' })
  @ApiResponse({ status: 200, description: 'La relación ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Relación no encontrada.' })
  async removeRoomScreening(id: number) {
    const roomScreening = await this.findOneRoomScreening(id);
    return this.roomScreeningRepository.remove(roomScreening);
  }
}
