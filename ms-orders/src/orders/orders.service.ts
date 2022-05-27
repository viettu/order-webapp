import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStates } from '../share';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderInfoEntity, OrderItemEntity } from './entities';
import { OrderEntity } from './entities/order.entity';
import { OrdersPaymentQueueProcessor } from './orders-payment-queue.processor';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemsRepository: Repository<OrderItemEntity>,
    @InjectRepository(OrderInfoEntity)
    private readonly orderInfoRepository: Repository<OrderInfoEntity>,
    private readonly ordersPaymentQueueProcessor: OrdersPaymentQueueProcessor
  ) {}

  async create(createUserDto: CreateOrderDto): Promise<OrderEntity> {
    
    // TODO: should update the validation
    // TODO: transaction?

    const orderInfo = new OrderInfoEntity();
    orderInfo.name = createUserDto.info.name;
    orderInfo.address = createUserDto.info.address;
    orderInfo.phone = createUserDto.info.phone;
    const newOrderInfo = await this.orderInfoRepository.save(orderInfo);

    const order = new OrderEntity();
    order.state = OrderStates.CREATED;
    order.amount =  createUserDto.amount;
    order.info = newOrderInfo;
    const newOrder = await this.ordersRepository.save(order);

    const orderItems: OrderItemEntity[] = createUserDto?.items.map((e) => {
      const orderItem = new OrderItemEntity();
      orderItem.product = e.product;
      orderItem.order = order;
      orderItem.price = e.price;
      orderItem.quantity = e.quantity;
      orderItem.unit = e.unit;
      return orderItem;
    });
    
    await this.orderItemsRepository.save(orderItems);

    await this.ordersPaymentQueueProcessor.processPayment(newOrder.id);
    return this.getOrder(newOrder.id);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: number): Promise<OrderEntity> {
    const foundItem = await this.ordersRepository.findOne(id, { relations: ["items", "info"] });
    return foundItem;
  }

  async getOrder(id: number): Promise<OrderEntity> {
    const foundItem = await this.findOne(id);
    if (!foundItem) {
      throw new NotFoundException(`Unable to found the item with id ${id}`);
    }
    return foundItem;
  }

  async cancel(id: number): Promise<OrderEntity> {
    const order = await this.getOrder(id);
    // TODO: should convert the state to enums
    if (order.state !== OrderStates.CREATED && order.state !== OrderStates.CONFIRMED) {
      throw new BadRequestException(`Unable to cancel an order with state ${order.state}`);
    }

    order.state = OrderStates.CANCELLED;
    await this.ordersRepository.save(order);

    return this.getOrder(order.id);
  }

  async getState(id: number): Promise<string> {
    return (await this.getOrder(id)).state;
  }
}
