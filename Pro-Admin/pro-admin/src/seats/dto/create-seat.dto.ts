import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateSeatDto {
  @ApiProperty({ description: 'Código del asiento', example: 'A1' })
  @IsString()
  @IsNotEmpty()
  code: string

  @ApiProperty({ description: 'Fila del asiento', example: 'A' })
  @IsString()
  @IsNotEmpty()
  row: string

  @ApiProperty({ description: 'ID de la sala', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  roomId: number
}
