import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Nombre de la sala',
    example: 'Sala 1'
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
