import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('GET_PAYMENT_STATUS')
  getPaymentStatus() {
    const randomNumber = this.appService.getRandomInt(1, 4);
    return randomNumber <= 2 ? 'CONFIRMED' : 'DECLINED';
  }
}
