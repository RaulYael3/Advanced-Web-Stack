import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateSeatDto {
  @ApiProperty({ description: 'Cantidad de asientos en la fila', example: '10' })
  @IsString()
  @IsNotEmpty({ message: 'code should not be empty' })
  code: string

  @ApiProperty({ description: 'Fila del asiento', example: 'A' })
  @IsString()
  @IsNotEmpty({ message: 'row should not be empty' })
  row: string

  @ApiProperty({ description: 'ID de la sala', example: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'roomId must be a number' })
  @IsNotEmpty({ message: 'roomId is required' })
  roomId: number
}
