import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seat } from '../../seats/entities/seat.entity';
import { RoomScreening } from './room-screening.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Seat, seat => seat.room)
  seats: Seat[];

  @OneToMany(() => RoomScreening, roomScreening => roomScreening.room)
  roomScreenings: RoomScreening[];
}
