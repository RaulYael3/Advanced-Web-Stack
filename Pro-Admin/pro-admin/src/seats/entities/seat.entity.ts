import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Room } from '../../rooms/entities/room.entity'
import { Ticket } from '../../tickets/entities/ticket.entity'

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  seatNumber: number // Número del asiento (1, 2, 3...)

  @Column()
  row: string // Fila (A, B, C...)

  @Column({ default: false })
  isOccupied: boolean // Estado de ocupación

  @ManyToOne(() => Room, (room) => room.seats)
  @JoinColumn({ name: 'room_id' })
  room: Room

  @OneToMany(() => Ticket, (ticket) => ticket.seat)
  tickets: Ticket[]
}
