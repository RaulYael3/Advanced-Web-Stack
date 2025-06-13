import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoomScreeningDto {
  @ApiProperty({
    description: 'ID de la sala',
    example: 1
  })
  @IsNumber()
  roomId: number

  @ApiProperty({
    description: 'ID de la función',
    example: 1
  })
  @IsNumber()
  screeningId: number
}
