import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TicketsService } from './tickets.service'
import { TicketsController } from './tickets.controller'
import { Ticket } from './entities/ticket.entity'
import { CustomersModule } from '../customers/customers.module'
import { SeatsModule } from '../seats/seats.module'
import { S3Module } from '../s3/s3.module'
import { Seat } from '../seats/entities/seat.entity'
import { Screening } from '../screenings/entities/screening.entity'
import { Customer } from '../customers/entities/customer.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Seat, Screening, Customer]),
    CustomersModule,
    SeatsModule,
    S3Module
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
