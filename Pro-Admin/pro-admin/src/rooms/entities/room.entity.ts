import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Seat } from '../../seats/entities/seat.entity'
import { RoomScreening } from './room-screening.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Room {
  @ApiProperty({ description: 'ID único de la sala' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Nombre de la sala' })
  @Column()
  name: string

  @ApiProperty({ description: 'Asientos de la sala', type: () => [Seat] })
  @OneToMany(() => Seat, (seat) => seat.room)
  seats: Seat[]

  @ApiProperty({ description: 'Funciones asignadas a la sala', type: () => [RoomScreening] })
  @OneToMany(() => RoomScreening, (roomScreening) => roomScreening.room)
  roomScreenings: RoomScreening[]
}
