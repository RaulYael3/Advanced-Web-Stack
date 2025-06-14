import { Injectable } from '@nestjs/common'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ticket } from './entities/ticket.entity'
import { Seat } from '../seats/entities/seat.entity'
import { Screening } from '../screenings/entities/screening.entity'
import { Customer } from '../customers/entities/customer.entity'

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Screening)
    private readonly screeningRepository: Repository<Screening>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    console.log('Creating ticket:', createTicketDto)

    try {
      // Verificar que el asiento existe y no está ocupado
      const seat = await this.seatRepository.findOne({
        where: { id: createTicketDto.seatId },
        relations: ['room']
      })

      if (!seat) {
        throw new Error('Seat not found')
      }

      if (seat.isOccupied) {
        throw new Error('Seat is already occupied')
      }

      // Verificar que la función existe
      const screening = await this.screeningRepository.findOne({
        where: { id: createTicketDto.screeningId },
        relations: ['movie']
      })

      if (!screening) {
        throw new Error('Screening not found')
      }

      // Buscar o crear el cliente
      let customer = await this.customerRepository.findOne({
        where: { email: createTicketDto.customerEmail }
      })

      if (!customer) {
        customer = this.customerRepository.create({
          name: createTicketDto.customerName,
          email: createTicketDto.customerEmail
        })
        customer = await this.customerRepository.save(customer)
      }

      // Crear el ticket
      const ticket = this.ticketRepository.create({
        customer: customer,
        seat: seat,
        screening: screening,
        purchaseDate: new Date()
      })

      const savedTicket = await this.ticketRepository.save(ticket)

      // Marcar el asiento como ocupado
      seat.isOccupied = true
      await this.seatRepository.save(seat)

      // If save returns an array, use savedTicket[0], otherwise use savedTicket directly
      const ticketResult = Array.isArray(savedTicket) ? savedTicket[0] : savedTicket

      console.log('Ticket created successfully:', ticketResult.id)

      return {
        id: ticketResult.id,
        customerName: customer.name,
        customerEmail: customer.email,
        purchaseDate: ticketResult.purchaseDate,
        seat: {
          id: seat.id,
          seatNumber: seat.seatNumber,
          row: seat.row,
          room: seat.room
        },
        screening: {
          id: screening.id,
          datetime: screening.datetime,
          movie: screening.movie
        },
        message: `Boleto comprado exitosamente para ${seat.row}${seat.seatNumber}`
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error instanceof Error ? error : new Error('Unknown error occurred')
    }
  }

  async findAll() {
    console.log('Finding all tickets...')
    const tickets = await this.ticketRepository.find({
      relations: ['customer', 'seat', 'seat.room', 'screening', 'screening.movie'],
      order: { purchaseDate: 'DESC' }
    })
    console.log('Total tickets found:', tickets.length)
    return tickets
  }

  async findByCustomer(customerEmail: string) {
    console.log('Finding tickets for customer email:', customerEmail)

    // Primero buscar el customer
    const customer = await this.customerRepository.findOne({
      where: { email: customerEmail }
    })

    console.log('Customer found:', customer)

    if (!customer) {
      console.log('No customer found with email:', customerEmail)
      return []
    }

    const tickets = await this.ticketRepository.find({
      where: { customer: { id: customer.id } },
      relations: ['seat', 'seat.room', 'screening', 'screening.movie', 'customer'],
      order: { purchaseDate: 'DESC' }
    })

    console.log('Tickets found for customer:', tickets.length)
    return tickets
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`
  }
}
