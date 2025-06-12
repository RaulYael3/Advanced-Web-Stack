import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningsController } from './screenings.controller';
import { ScreeningsService } from './screenings.service';

describe('ScreeningsController', () => {
  let controller: ScreeningsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreeningsController],
      providers: [ScreeningsService],
    }).compile();

    controller = module.get<ScreeningsController>(ScreeningsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
