import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TicketsService } from './tickets.service'
import { TicketsController } from './tickets.controller'
import { Ticket } from './entities/ticket.entity'
import { CustomersModule } from '../customers/customers.module'
import { SeatsModule } from '../seats/seats.module'
import { S3Module } from '../s3/s3.module'

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), CustomersModule, SeatsModule, S3Module],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
