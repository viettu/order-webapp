import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('shoule return CONFIRMED OR DECLINED"', () => {
      const paymentState = appController.getPaymentStatus();
      expect(['CONFIRMED', 'DECLINED'].includes(paymentState)).toBeTruthy();
    });
  });
});
