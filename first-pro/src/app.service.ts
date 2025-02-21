import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello !';
  }
  getEquipo(): string {
    return 'equipo111';
  }
}
