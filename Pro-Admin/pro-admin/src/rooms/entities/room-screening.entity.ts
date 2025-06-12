import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity';
import { Screening } from '../../screenings/entities/screening.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('room_screening')
export class RoomScreening {
  @ApiProperty({ description: 'ID único de la relación sala-función' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Sala asignada', type: () => Room })
  @ManyToOne(() => Room, room => room.roomScreenings)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ApiProperty({ description: 'Función asignada', type: () => Screening })
  @ManyToOne(() => Screening, screening => screening.roomScreenings)
  @JoinColumn({ name: 'screening_id' })
  screening: Screening;
} 