import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrderController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
            provide: OrdersService,
            useValue: {    
                create: jest.fn().mockResolvedValue({
                    id: 1,
                    state: 'CREATED',
                    amount: 200
                }),
                findAll: jest.fn().mockResolvedValue([
                    {
                        id: 1,
                        state: 'CREATED',
                        amount: 200
                    },
                    {
                        id: 2,
                        state: 'CREATED',
                        amount: 300
                    }
                ]),
                findOne: jest.fn().mockResolvedValue({
                    id: 1,
                    state: 'CREATED',
                    amount: 200
                }),
                cancel: jest.fn().mockResolvedValue({
                    id: 1,
                    state: 'CANCELED',
                    amount: 200
                }),
                getState: jest.fn().mockResolvedValue("DELIVERED"),
            }
        }
    ],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('OrderController', () => {

    it('should be defined', () => {
        expect(ordersController).toBeDefined();
      });

      it('should create order', async () => {
        const orderDto = new CreateOrderDto();
        orderDto.amount = 100;

        const newOrder = await ordersController.create(orderDto);
        expect(newOrder).toEqual({
            id: 1,
            state: 'CREATED',
            amount: 200
        });
      });
  });
});