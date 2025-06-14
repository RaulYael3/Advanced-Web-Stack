import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Room } from '../../rooms/entities/room.entity'
import { Ticket } from '../../tickets/entities/ticket.entity'

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number

  @Column('json')
  code: Array<{
    id: number
    seatNumber: number
    isOccupied: boolean
  }>

  @Column()
  row: string

  @ManyToOne(() => Room, (room) => room.seats)
  @JoinColumn({ name: 'room_id' })
  room: Room

  @OneToMany(() => Ticket, (ticket) => ticket.seat)
  tickets: Ticket[]
}
