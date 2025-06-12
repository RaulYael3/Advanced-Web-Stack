import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomScreening } from './entities/room-screening.entity';
import { CreateRoomScreeningDto } from './dto/create-room-screening.dto';
import { UpdateRoomScreeningDto } from './dto/update-room-screening.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(RoomScreening)
    private roomScreeningsRepository: Repository<RoomScreening>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomsRepository.create(createRoomDto);
    return this.roomsRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomsRepository.find({
      relations: ['seats', 'roomScreenings', 'roomScreenings.screening'],
    });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({
      where: { id },
      relations: ['seats', 'roomScreenings', 'roomScreenings.screening'],
    });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    Object.assign(room, updateRoomDto);
    return this.roomsRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    await this.roomsRepository.remove(room);
  }

  // RoomScreening methods
  async createRoomScreening(createRoomScreeningDto: CreateRoomScreeningDto): Promise<RoomScreening> {
    const roomScreening = this.roomScreeningsRepository.create({
      room: { id: createRoomScreeningDto.roomId },
      screening: { id: createRoomScreeningDto.screeningId }
    });
    return this.roomScreeningsRepository.save(roomScreening);
  }

  async findAllRoomScreenings(): Promise<RoomScreening[]> {
    return this.roomScreeningsRepository.find({
      relations: ['room', 'screening'],
    });
  }

  async findOneRoomScreening(id: number): Promise<RoomScreening> {
    const roomScreening = await this.roomScreeningsRepository.findOne({
      where: { id },
      relations: ['room', 'screening'],
    });
    if (!roomScreening) {
      throw new NotFoundException(`RoomScreening with ID ${id} not found`);
    }
    return roomScreening;
  }

  async updateRoomScreening(id: number, updateRoomScreeningDto: UpdateRoomScreeningDto): Promise<RoomScreening> {
    const roomScreening = await this.findOneRoomScreening(id);
    Object.assign(roomScreening, updateRoomScreeningDto);
    return this.roomScreeningsRepository.save(roomScreening);
  }

  async removeRoomScreening(id: number): Promise<void> {
    const roomScreening = await this.findOneRoomScreening(id);
    await this.roomScreeningsRepository.remove(roomScreening);
  }
}
