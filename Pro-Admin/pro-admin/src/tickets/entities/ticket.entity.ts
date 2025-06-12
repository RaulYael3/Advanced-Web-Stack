import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { Screening } from '../../screenings/entities/screening.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, customer => customer.tickets)
  customer: Customer;

  @ManyToOne(() => Seat, seat => seat.tickets)
  seat: Seat;

  @ManyToOne(() => Screening, screening => screening.tickets)
  screening: Screening;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchaseDate: Date;

  @Column({ type: 'decimal', nullable: true })
  price: number;
}
