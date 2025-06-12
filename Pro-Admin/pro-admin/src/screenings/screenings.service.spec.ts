import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningsService } from './screenings.service';

describe('ScreeningsService', () => {
  let service: ScreeningsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningsService],
    }).compile();

    service = module.get<ScreeningsService>(ScreeningsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
