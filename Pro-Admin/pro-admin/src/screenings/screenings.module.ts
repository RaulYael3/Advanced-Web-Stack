import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningsService } from './screenings.service';
import { ScreeningsController } from './screenings.controller';
import { Screening } from './entities/screening.entity';
import { MoviesModule } from '../movies/movies.module';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Screening]),
    MoviesModule,
    TicketsModule
  ],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
  exports: [ScreeningsService],
})
export class ScreeningsModule {}
