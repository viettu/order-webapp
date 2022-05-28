import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORDERS_PAYMENT_QUEUE_NAME } from '../share';
import { OrderEntity, OrderInfoEntity, OrderItemEntity } from './entities';
import { OrdersPaymentQueueProcessor } from './orders-payment-queue.processor';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, OrderInfoEntity]),
    ClientsModule.register([
      {
        name: 'PAYMENTS_SVR',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RABBITMQ_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    BullModule.registerQueue({
      name: ORDERS_PAYMENT_QUEUE_NAME,
    }),
  ],
  providers: [OrdersService, OrdersPaymentQueueProcessor],
  controllers: [OrdersController],
})
export class OrdersModule {
  onModuleInit() {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `Transporter Connection`,
        `${process.env.RABBITMQ_URL} - ${process.env.RABBITMQ_QUEUE}`,
      );
    }
  }
}
