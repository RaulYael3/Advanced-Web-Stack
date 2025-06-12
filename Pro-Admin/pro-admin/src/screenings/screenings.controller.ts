import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScreeningsService } from './screenings.service';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';

@Controller('screenings')
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Post()
  create(@Body() createScreeningDto: CreateScreeningDto) {
    return this.screeningsService.create(createScreeningDto);
  }

  @Get()
  findAll() {
    return this.screeningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screeningsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreeningDto: UpdateScreeningDto) {
    return this.screeningsService.update(+id, updateScreeningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screeningsService.remove(+id);
  }
}
