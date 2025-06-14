import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common'
import { TicketsService } from './tickets.service'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { ValidationPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Comprar un boleto' })
  @ApiResponse({ status: 201, description: 'Boleto comprado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o asiento ocupado' })
  async create(@Body() createTicketDto: CreateTicketDto) {
    console.log('Creating ticket with data:', createTicketDto)

    try {
      const result = await this.ticketsService.create(createTicketDto)
      return result
    } catch (error) {
      console.error('Error in ticket creation:', error)
      throw new Error(error.message || 'Error creating ticket')
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tickets (para debug)' })
  async findAll() {
    return this.ticketsService.findAll()
  }

  @Get('customer/:email')
  @ApiOperation({ summary: 'Obtener boletos de un cliente' })
  async findByCustomer(@Param('email') email: string) {
    console.log('Finding tickets for customer email:', email)
    const tickets = await this.ticketsService.findByCustomer(email)
    console.log('Found tickets:', tickets.length)
    return tickets
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id)
  }
}
