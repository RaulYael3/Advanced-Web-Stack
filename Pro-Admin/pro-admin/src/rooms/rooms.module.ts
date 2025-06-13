import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomsService } from './rooms.service'
import { RoomsController } from './rooms.controller'
import { Room } from './entities/room.entity'
import { RoomScreening } from './entities/room-screening.entity'
import { ScreeningsModule } from '../screenings/screenings.module'

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomScreening]), ScreeningsModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
