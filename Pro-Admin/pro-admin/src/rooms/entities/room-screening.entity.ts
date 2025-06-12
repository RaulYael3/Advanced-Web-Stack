import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity';
import { Screening } from '../../screenings/entities/screening.entity';

@Entity('room_screening')
export class RoomScreening {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, room => room.roomScreenings)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => Screening, screening => screening.roomScreenings)
  @JoinColumn({ name: 'screening_id' })
  screening: Screening;
} 