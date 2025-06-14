import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateTicketDto {
  @ApiProperty({ description: 'ID de la función', example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'screeningId must be a number' })
  screeningId: number

  @ApiProperty({ description: 'ID del asiento', example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'seatId must be a number' })
  seatId: number

  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty({ message: 'customerName is required' })
  customerName: string

  @ApiProperty({ description: 'Email del cliente', example: 'juan@email.com' })
  @IsString()
  @IsNotEmpty({ message: 'customerEmail is required' })
  customerEmail: string
}
