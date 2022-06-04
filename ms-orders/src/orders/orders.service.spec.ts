import { Test, TestingModule } from '@nestjs/testing';
import { OrderEntity, OrderInfoEntity, OrderItemEntity } from './entities';
import { OrdersPaymentQueueProcessor } from './orders-payment-queue.processor';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderInfoDto } from './dto/create-order-info.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

const MOCK_ORDER = {
  id: 1,
  state: 'CREATED',
  amount: 100,
};

describe('AppService', () => {
  let service: OrdersService;
  let saveOrderInfoFn;
  let saveOrderItemsFn;
  let saveOrderFn;
  let processPaymentFn;

  beforeEach(async () => {
    saveOrderInfoFn = jest.fn().mockResolvedValue({});
    saveOrderItemsFn = jest.fn().mockResolvedValue([]);
    saveOrderFn = jest.fn().mockResolvedValue(MOCK_ORDER);
    processPaymentFn = jest.fn().mockImplementation((orderId: number) => Promise.resolve({ id: orderId }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([MOCK_ORDER]),
            findOne: jest.fn().mockResolvedValue(MOCK_ORDER),
            save: saveOrderFn,
          },
        },
        {
          provide: getRepositoryToken(OrderItemEntity),
          useValue: { save: saveOrderItemsFn },
        },
        {
          provide: getRepositoryToken(OrderInfoEntity),
          useValue: { save: saveOrderInfoFn },
        },
        {
          provide: OrdersPaymentQueueProcessor,
          useValue: { processPayment: processPaymentFn },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create order', async () => {
    const orderDto = new CreateOrderDto();
    orderDto.amount = 100;

    orderDto.info = new CreateOrderInfoDto();
    orderDto.info.address = 'TEST';
    orderDto.info.phone = 'TEST';
    orderDto.info.name = 'TEST';

    const orderItemDto = new CreateOrderItemDto();
    orderItemDto.price = 100;
    orderItemDto.productId = 1;
    orderItemDto.quantity = 10;

    orderDto.items = [orderItemDto];

    const newOrder = await service.create(orderDto);

    expect(saveOrderInfoFn).toHaveBeenCalledWith({
      name: 'TEST',
      address: 'TEST',
      phone: 'TEST',
    });
    expect(saveOrderItemsFn).toHaveBeenCalled();
    expect(saveOrderFn).toHaveBeenCalled();
    expect(processPaymentFn).toHaveBeenCalled();

    expect(newOrder).toEqual(MOCK_ORDER);
  });

  it('should get one entity', async () => {
    const foundItem = await service.findOne(1);
    expect(foundItem).toEqual(MOCK_ORDER);
  });
});
