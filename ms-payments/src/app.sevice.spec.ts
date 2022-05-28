import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get random value', () => {
    const valuein1to5 = service.getRandomInt(1, 5);
    expect(valuein1to5).toBeLessThan(5);
    expect(valuein1to5).toBeGreaterThanOrEqual(1);
  });
});
