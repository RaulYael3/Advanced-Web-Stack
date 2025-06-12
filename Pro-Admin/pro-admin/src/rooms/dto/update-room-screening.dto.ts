import { PartialType } from '@nestjs/swagger';
import { CreateRoomScreeningDto } from './create-room-screening.dto';

export class UpdateRoomScreeningDto extends PartialType(CreateRoomScreeningDto) {} 