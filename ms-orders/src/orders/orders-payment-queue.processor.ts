import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Job, Queue } from "bull";
import { firstValueFrom } from "rxjs";
import { Repository } from "typeorm";
import { OrderStates, PaymentProcessStatuses, ORDERS_PAYMENT_QUEUE_NAME } from "../share";
import { OrderEntity } from "./entities";

enum QueueProcesses {
    PAY_ORDER = 'PAY_ORDER',
    CONFIRM_ORDER = 'CONFIRM_ORDER',
    CANCEL_ORDER = 'CANCEL_ORDER',
    DELIVER_ORDER = 'DELIVER_ORDER'
}

interface IProcessOrderData {
    orderId: number
}

const DELIVERY_AFTER_CONFIRMATION_INTERVAL = 5000;

@Processor(ORDERS_PAYMENT_QUEUE_NAME)
export class OrdersPaymentQueueProcessor {
    constructor(
        @InjectQueue(ORDERS_PAYMENT_QUEUE_NAME)
        private ordersPaymentQueue: Queue,
        @Inject('PAYMENTS_SVR')
        private readonly clientProxy: ClientProxy,
        @InjectRepository(OrderEntity)
        private readonly ordersRepository: Repository<OrderEntity>,
    ) {}

    async processPayment(orderId: number) {
        return this.ordersPaymentQueue.add(QueueProcesses.PAY_ORDER, <IProcessOrderData>{ orderId });
    }

    @Process(QueueProcesses.PAY_ORDER)
    async payOrder({ data }: Job<IProcessOrderData>) {
        const order = await this.ordersRepository.findOne(data.orderId);
        if (order.state !== OrderStates.CREATED) {
            return;
        }

        const paymentProcessStatus = await firstValueFrom(this.clientProxy.send('GET_PAYMENT_STATUS', order.id));
        if (paymentProcessStatus === PaymentProcessStatuses.CONFIRMED) {
            return this.ordersPaymentQueue.add(QueueProcesses.CONFIRM_ORDER, <IProcessOrderData>{ orderId: order.id });
        }

        return this.ordersPaymentQueue.add(QueueProcesses.CANCEL_ORDER, <IProcessOrderData>{ orderId: order.id });
    }

    @Process(QueueProcesses.CONFIRM_ORDER)
    async confirmOrder({ data }: Job<IProcessOrderData>) {
        const orderId = data.orderId;
        await this.updateState(data.orderId, OrderStates.CONFIRMED);
        return this.ordersPaymentQueue.add(QueueProcesses.DELIVER_ORDER, <IProcessOrderData>{ orderId: orderId }, { delay: DELIVERY_AFTER_CONFIRMATION_INTERVAL });
    }

    @Process(QueueProcesses.CANCEL_ORDER)
    async cancelOrder({ data }: Job<IProcessOrderData>) {
        return this.updateState(data.orderId, OrderStates.CANCELLED);
    }

    @Process(QueueProcesses.DELIVER_ORDER)
    async deliverlOrder({ data }: Job<IProcessOrderData>) {
        // TODO: add check for not update DELIVERED state for CANCELLED orders
        return this.updateState(data.orderId, OrderStates.DELIVERED);
    }

    private async updateState(orderId: number, toState: OrderStates) {
        const order = await this.ordersRepository.findOne(orderId);
        if (order.state === toState) {
            return;
        }
        order.state = toState;
        return this.ordersRepository.save(order);
    }
}