import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomScreeningDto {
  @ApiProperty({ description: 'ID de la sala' })
  @IsNumber()
  roomId: number;

  @ApiProperty({ description: 'ID de la función' })
  @IsNumber()
  screeningId: number;
} 