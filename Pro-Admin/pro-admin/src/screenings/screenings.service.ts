import { Injectable } from '@nestjs/common';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';

@Injectable()
export class ScreeningsService {
  create(createScreeningDto: CreateScreeningDto) {
    return 'This action adds a new screening';
  }

  findAll() {
    return `This action returns all screenings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} screening`;
  }

  update(id: number, updateScreeningDto: UpdateScreeningDto) {
    return `This action updates a #${id} screening`;
  }

  remove(id: number) {
    return `This action removes a #${id} screening`;
  }
}
