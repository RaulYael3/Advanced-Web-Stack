import { Module } from '@nestjs/common';
import { ScreeningsService } from './screenings.service';
import { ScreeningsController } from './screenings.controller';

@Module({
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
})
export class ScreeningsModule {}
