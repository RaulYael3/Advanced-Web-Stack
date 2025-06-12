import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { Screening } from '../../screenings/entities/screening.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Ticket {
  @ApiProperty({ description: 'ID único del ticket' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Cliente que compró el ticket', type: () => Customer })
  @ManyToOne(() => Customer, customer => customer.tickets)
  customer: Customer;

  @ApiProperty({ description: 'Asiento asignado', type: () => Seat })
  @ManyToOne(() => Seat, seat => seat.tickets)
  seat: Seat;

  @ApiProperty({ description: 'Función para la que se compró el ticket', type: () => Screening })
  @ManyToOne(() => Screening, screening => screening.tickets)
  screening: Screening;

  @ApiProperty({ description: 'Fecha y hora de la compra' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  @ApiProperty({ description: 'Precio del ticket', required: false })
  @Column({ type: 'decimal', nullable: true })
  price: number;
}
