import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string; // número o código de asiento

  @Column()
  row: string; // fila

  @ManyToOne(() => Room, room => room.seats)
  room: Room;

  @OneToMany(() => Ticket, ticket => ticket.seat)
  tickets: Ticket[];
}
