import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateSeatDto {
  @ApiProperty({ description: 'Fila del asiento', example: 'A' })
  @IsString()
  @IsNotEmpty()
  row: string

  @ApiProperty({ description: 'Cantidad de asientos en la fila', example: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  seatCount: number

  @ApiProperty({ description: 'ID de la sala', example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  roomId: number
}
