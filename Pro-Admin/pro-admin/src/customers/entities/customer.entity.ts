import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Ticket } from '../../tickets/entities/ticket.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Customer {
  @ApiProperty({ description: 'ID único del cliente' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Nombre del cliente' })
  @Column()
  name: string

  @ApiProperty({ description: 'Email del cliente (debe ser único)' })
  @Column({ unique: true })
  email: string

  @ApiProperty({ description: 'Teléfono del cliente', required: false })
  @Column({ nullable: true })
  phone: string

  @ApiProperty({ description: 'Tickets comprados por el cliente', type: () => [Ticket] })
  @OneToMany(() => Ticket, (ticket) => ticket.customer)
  tickets: Ticket[]
}
