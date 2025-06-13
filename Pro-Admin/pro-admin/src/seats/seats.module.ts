import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeatsService } from './seats.service'
import { SeatsController } from './seats.controller'
import { Seat } from './entities/seat.entity'
import { RoomsModule } from '../rooms/rooms.module'

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), forwardRef(() => RoomsModule)],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService]
})
export class SeatsModule {}
