import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateScreeningDto {
  @ApiProperty({ description: 'Fecha y hora de la función', example: '2024-01-15T19:30:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  datetime: Date

  @ApiProperty({ description: 'ID de la película', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  movieId: number

  @ApiProperty({ description: 'IDs de las salas asignadas', example: [1, 2] })
  @IsNumber({}, { each: true })
  roomIds: number[]
}
